package com.xamracer.backend.service;

import com.xamracer.backend.dto.*;
import com.xamracer.backend.model.*;
import com.xamracer.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameSessionRepository sessionRepo;
    private final UserService userService;
    private final QuestionService questionService;
    private final UserStatsRepository statsRepo;
    private final Random random = new Random();

    private static final long COOLDOWN_SECONDS = 5L;

    @Transactional
    public StartGameResponse startNewGame(String username) {
        User user = userService.getUserByUsername(username);
        if (user == null) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found");

        UserStats stats = statsRepo.findById(user.getId())
                .orElse(UserStats.builder().userId(user.getId()).build());

        if (stats.getLastPlayedAt() != null) {
            Duration since = Duration.between(stats.getLastPlayedAt(), LocalDateTime.now());
            if (since.getSeconds() < COOLDOWN_SECONDS) {
                throw new ResponseStatusException(HttpStatus.TOO_MANY_REQUESTS, "Please wait before starting a new game");
            }
        }

        GameSession session = sessionRepo.save(
                GameSession.builder()
                        .user(user)
                        .active(true)
                        .won(false)
                        .currentStep(0)
                        .build()
        );

        Question firstQ = pickRandomQuestionExcluding(session.getAskedQuestionIds());
        session.getAskedQuestionIds().add(firstQ.getId());
        sessionRepo.save(session);

        stats.setLastPlayedAt(LocalDateTime.now());
        statsRepo.save(stats);

        return StartGameResponse.builder()
                .sessionId(session.getId())
                .question(firstQ)
                .build();
    }

    private Question pickRandomQuestionExcluding(List<Long> excludeIds) {
        List<Question> available = questionService.getAllQuestions().stream()
                .filter(q -> !excludeIds.contains(q.getId()))
                .toList();
        if (available.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No questions available");
        return available.get(random.nextInt(available.size()));
    }

    @Transactional
    public GameStateResponse processAnswer(AnswerRequest req, String username) {
        GameSession session = sessionRepo.findById(req.getSessionId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Session not found"));

        if (!session.isActive()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Session is inactive");
        if (!session.getUser().getUsername().equals(username))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized session access");

        boolean correct = questionService.validateAnswer(req.getQuestionId(), req.getAnswer());
        if (correct) return handleCorrect(session);
        else return handleWrong(session);
    }

    private GameStateResponse handleCorrect(GameSession session) {
        session.setCorrectCount(session.getCorrectCount() + 1);
        session.setCurrentStep(session.getCurrentStep() + 1);

        if (session.getCurrentStep() >= 6) {
            session.setWon(true);
            session.setActive(false);
            session.setEndedAt(LocalDateTime.now());
            sessionRepo.save(session);
            applyWin(session);
            return GameStateResponse.builder()
                    .sessionId(session.getId())
                    .currentStep(session.getCurrentStep())
                    .active(false)
                    .won(true)
                    .feedback("Correct! You won!")
                    .build();
        }

        Question next = pickRandomQuestionExcluding(session.getAskedQuestionIds());
        session.getAskedQuestionIds().add(next.getId());
        sessionRepo.save(session);

        return GameStateResponse.builder()
                .sessionId(session.getId())
                .currentStep(session.getCurrentStep())
                .active(true)
                .won(false)
                .feedback("Correct! Move to next block.")
                .nextQuestion(next)
                .build();
    }

    private GameStateResponse handleWrong(GameSession session) {
        session.setWrongCount(session.getWrongCount() + 1);
        session.setActive(false);
        session.setWon(false);
        session.setEndedAt(LocalDateTime.now());
        sessionRepo.save(session);
        applyLoss(session);
        return GameStateResponse.builder()
                .sessionId(session.getId())
                .currentStep(session.getCurrentStep())
                .active(false)
                .won(false)
                .feedback("Wrong answer. You lost.")
                .build();
    }

    private void applyWin(GameSession session) {
        UserStats stats = statsRepo.findById(session.getUser().getId())
                .orElse(UserStats.builder().userId(session.getUser().getId()).build());
        stats.setTotalWins(stats.getTotalWins() + 1);
        stats.setProfileScore(stats.getProfileScore() + 1);
        stats.setCurrentStreak(stats.getCurrentStreak() + 1);
        stats.setLastPlayedAt(LocalDateTime.now());
        statsRepo.save(stats);
    }

    private void applyLoss(GameSession session) {
        UserStats stats = statsRepo.findById(session.getUser().getId())
                .orElse(UserStats.builder().userId(session.getUser().getId()).build());
        stats.setTotalLosses(stats.getTotalLosses() + 1);
        stats.setProfileScore(stats.getProfileScore() - 1);
        stats.setCurrentStreak(0);
        stats.setLastPlayedAt(LocalDateTime.now());
        statsRepo.save(stats);
    }

    public GameStateResponse getStatus(Long sessionId, String username) {
        GameSession session = sessionRepo.findById(sessionId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Session not found"));
        if (!session.getUser().getUsername().equals(username))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Unauthorized");

        return GameStateResponse.builder()
                .sessionId(session.getId())
                .currentStep(session.getCurrentStep())
                .active(session.isActive())
                .won(session.isWon())
                .feedback(session.isActive() ? "In progress" : (session.isWon() ? "Won" : "Lost"))
                .build();
    }
}

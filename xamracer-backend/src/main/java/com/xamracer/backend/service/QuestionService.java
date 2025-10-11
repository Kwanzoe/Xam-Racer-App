package com.xamracer.backend.service;

import com.xamracer.backend.model.Question;
import com.xamracer.backend.repository.QuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class QuestionService {

    private final QuestionRepository repository;
    private final Random random = new Random();

    public QuestionService(QuestionRepository repository) {
        this.repository = repository;
    }

    // CREATE or UPDATE
    public Question saveQuestion(Question q) {
        return repository.save(q);
    }

    // READ all
    public List<Question> getAllQuestions() {
        return repository.findAll();
    }

    // READ one
    public Question getQuestionById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Question not found"));
    }

    // UPDATE
    public Question updateQuestion(Long id, Question updated) {
        Question existing = getQuestionById(id);
        existing.setQuestionText(updated.getQuestionText());
        existing.setOptionA(updated.getOptionA());
        existing.setOptionB(updated.getOptionB());
        existing.setOptionC(updated.getOptionC());
        existing.setOptionD(updated.getOptionD());
        existing.setCorrectAnswer(updated.getCorrectAnswer());
        return repository.save(existing);
    }

    // DELETE
    public void deleteQuestion(Long id) {
        if (!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Question not found");
        }
        repository.deleteById(id);
    }

    // RANDOM question
    public Question getRandomQuestion() {
        List<Question> all = repository.findAll();
        if (all.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No questions available");
        }
        return all.get(random.nextInt(all.size()));
    }

    // VALIDATE answer
    public boolean validateAnswer(Long id, String userAnswer) {
        Question q = getQuestionById(id);
        return q.getCorrectAnswer().equalsIgnoreCase(userAnswer.trim());
    }

    public Page<Question> getPaginatedQuestions(int page, int size, String category) {
        PageRequest pageRequest = PageRequest.of(page, size);
        if (category != null && !category.isBlank()) {
            return repository.findByCategoryIgnoreCase(category, pageRequest);
        } else {
            return repository.findAll(pageRequest);
        }
    }
}

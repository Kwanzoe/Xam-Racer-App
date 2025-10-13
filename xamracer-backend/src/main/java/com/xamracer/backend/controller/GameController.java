package com.xamracer.backend.controller;

import com.xamracer.backend.dto.*;
import com.xamracer.backend.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @PostMapping("/start")
    public ResponseEntity<StartGameResponse> startGame(Authentication auth) {
        return ResponseEntity.ok(gameService.startNewGame(auth.getName()));
    }

    @PostMapping("/answer")
    public ResponseEntity<GameStateResponse> submitAnswer(@RequestBody AnswerRequest req, Authentication auth) {
        return ResponseEntity.ok(gameService.processAnswer(req, auth.getName()));
    }

    @GetMapping("/status/{sessionId}")
    public ResponseEntity<GameStateResponse> status(@PathVariable Long sessionId, Authentication auth) {
        return ResponseEntity.ok(gameService.getStatus(sessionId, auth.getName()));
    }
}
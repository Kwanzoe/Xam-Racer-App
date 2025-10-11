package com.xamracer.backend.controller;

import com.xamracer.backend.model.Question;
import com.xamracer.backend.service.QuestionService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/questions")
public class QuestionController {

    private final QuestionService service;

    public QuestionController(QuestionService service) {
        this.service = service;
    }

    @PostMapping
    public Question addQuestion(@RequestBody @Valid Question q) {
        return service.saveQuestion(q);
    }

    @GetMapping
    public List<Question> getAllQuestions() {
        return service.getAllQuestions();
    }

    @GetMapping("/{id}")
    public Question getQuestionById(@PathVariable Long id) {
        return service.getQuestionById(id);
    }

    @PutMapping("/{id}")
    public Question updateQuestion(@PathVariable Long id, @RequestBody Question q) {
        return service.updateQuestion(id, q);
    }

    @DeleteMapping("/{id}")
    public void deleteQuestion(@PathVariable Long id) {
        service.deleteQuestion(id);
    }

    @GetMapping("/random")
    public Question getRandomQuestion() {
        return service.getRandomQuestion();
    }

    @PostMapping("/{id}/validate")
    public Map<String, Object> validateAnswer(@PathVariable Long id, @RequestBody Map<String, String> body) {
        boolean isCorrect = service.validateAnswer(id, body.get("answer"));
        return Map.of("correct", isCorrect);
    }

    @GetMapping("/fetch-questions")
    public Page<Question> getPaginatedQuestions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String category) {
        return service.getPaginatedQuestions(page, size, category);
    }
}

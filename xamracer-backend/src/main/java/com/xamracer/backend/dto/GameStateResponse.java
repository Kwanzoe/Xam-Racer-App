package com.xamracer.backend.dto;

import com.xamracer.backend.model.Question;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameStateResponse {
    private Long sessionId;
    private int currentStep;
    private boolean active;
    private boolean won;
    private String feedback;
    private Question nextQuestion;
}

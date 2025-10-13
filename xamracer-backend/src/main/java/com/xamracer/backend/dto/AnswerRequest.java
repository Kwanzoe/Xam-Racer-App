package com.xamracer.backend.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnswerRequest {
    private Long sessionId;
    private Long questionId;
    private String answer;
}
package com.xamracer.backend.dto;

import com.xamracer.backend.model.Question;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StartGameResponse {
    private Long sessionId;
    private Question question;
}

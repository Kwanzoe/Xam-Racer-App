package com.xamracer.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "game_sessions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private int currentStep;
    private int correctCount;
    private int wrongCount;
    private boolean active;
    private boolean won;

    @Builder.Default
    private LocalDateTime startedAt = LocalDateTime.now();

    private LocalDateTime endedAt;

    @ElementCollection
    @CollectionTable(name = "session_questions", joinColumns = @JoinColumn(name = "session_id"))
    @Column(name = "question_id")
    @Builder.Default
    private List<Long> askedQuestionIds = new ArrayList<>();
}

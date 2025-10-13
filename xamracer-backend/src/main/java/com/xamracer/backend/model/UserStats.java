package com.xamracer.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_stats")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserStats {

    @Id
    private Long userId;

    @Builder.Default private int totalWins = 0;
    @Builder.Default private int totalLosses = 0;
    @Builder.Default private int profileScore = 0;
    @Builder.Default private int currentStreak = 0;
    private LocalDateTime lastPlayedAt;
}
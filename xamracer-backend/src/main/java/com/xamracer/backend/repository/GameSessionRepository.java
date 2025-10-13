package com.xamracer.backend.repository;

import com.xamracer.backend.model.GameSession;
import com.xamracer.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface GameSessionRepository extends JpaRepository<GameSession, Long> {
    Optional<GameSession> findByUserAndActiveTrue(User user);
}
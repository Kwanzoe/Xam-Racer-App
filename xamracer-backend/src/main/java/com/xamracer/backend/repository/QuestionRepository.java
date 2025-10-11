package com.xamracer.backend.repository;

import com.xamracer.backend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Page<Question> findByCategoryIgnoreCase(String category, Pageable pageable);
}
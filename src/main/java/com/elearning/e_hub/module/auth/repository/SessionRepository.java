package com.elearning.e_hub.module.auth.repository;

import com.elearning.e_hub.module.auth.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SessionRepository extends JpaRepository<Session, Long> {
    Optional<Session> findByToken(String token);
}

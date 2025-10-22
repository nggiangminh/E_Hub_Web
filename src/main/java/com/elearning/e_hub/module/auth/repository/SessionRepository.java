package com.elearning.e_hub.module.auth.repository;

import com.elearning.e_hub.module.auth.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {
    Optional<Session> findByToken(String token);

    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END FROM Session s WHERE s.user.email = :email")
    boolean existsByEmail(@Param("email") String email);

    @Modifying
    @Query("DELETE FROM Session s WHERE s.user.id = :userId")
    void deleteByUserId(@Param("userId") Long userId);

    @Modifying
    @Query("UPDATE Session s SET s.isActive = false WHERE s.user.id = :userId")
    void deactivateAllUserSessions(@Param("userId") Long userId);
}

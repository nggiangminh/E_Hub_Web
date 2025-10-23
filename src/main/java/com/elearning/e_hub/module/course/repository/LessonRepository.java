package com.elearning.e_hub.module.course.repository;

import com.elearning.e_hub.module.course.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
}

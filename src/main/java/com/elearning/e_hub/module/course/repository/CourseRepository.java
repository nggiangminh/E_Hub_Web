package com.elearning.e_hub.module.course.repository;

import com.elearning.e_hub.module.course.entity.Course;
import com.elearning.e_hub.module.course.enums.CourseStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByInstructorId(Long instructorId);

    List<Course> findByStatus(CourseStatus status);

    @Query("SELECT c FROM Course c WHERE LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Course> searchByTitle(@Param("keyword") String keyword);
}

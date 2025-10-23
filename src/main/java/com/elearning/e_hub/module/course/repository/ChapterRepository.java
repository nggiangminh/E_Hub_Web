package com.elearning.e_hub.module.course.repository;

import com.elearning.e_hub.module.course.entity.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Long> {

    /**
     * Tìm chapter theo ID và courseId để đảm bảo chapter thuộc về course đó
     */
    @Query("SELECT c FROM Chapter c WHERE c.id = :chapterId AND c.course.id = :courseId")
    Optional<Chapter> findByIdAndCourseId(@Param("chapterId") Long chapterId, @Param("courseId") Long courseId);

    /**
     * Lấy tất cả chapters của một course, sắp xếp theo orderIndex
     */
    @Query("SELECT c FROM Chapter c WHERE c.course.id = :courseId ORDER BY c.orderIndex ASC")
    List<Chapter> findByCourseIdOrderByOrderIndexAsc(@Param("courseId") Long courseId);

    /**
     * Đếm số lượng chapters trong một course
     */
    @Query("SELECT COUNT(c) FROM Chapter c WHERE c.course.id = :courseId")
    long countByCourseId(@Param("courseId") Long courseId);
}

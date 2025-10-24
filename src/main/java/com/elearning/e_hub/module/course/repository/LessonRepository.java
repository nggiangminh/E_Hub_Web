package com.elearning.e_hub.module.course.repository;

import com.elearning.e_hub.module.course.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {

    /**
     * Tìm lesson theo ID và chapterId để đảm bảo lesson thuộc về chapter đó
     */
    @Query("SELECT l FROM Lesson l WHERE l.id = :lessonId AND l.chapter.id = :chapterId")
    Optional<Lesson> findByIdAndChapterId(@Param("lessonId") Long lessonId, @Param("chapterId") Long chapterId);

    /**
     * Lấy tất cả lessons của một chapter, sắp xếp theo orderIndex
     */
    @Query("SELECT l FROM Lesson l WHERE l.chapter.id = :chapterId ORDER BY l.orderIndex ASC")
    List<Lesson> findByChapterIdOrderByOrderIndexAsc(@Param("chapterId") Long chapterId);

    /**
     * Đếm số lượng lessons trong một chapter
     */
    @Query("SELECT COUNT(l) FROM Lesson l WHERE l.chapter.id = :chapterId")
    long countByChapterId(@Param("chapterId") Long chapterId);

    /**
     * Kiểm tra xem lesson có thuộc về chapter và course không
     */
    @Query("SELECT CASE WHEN COUNT(l) > 0 THEN true ELSE false END FROM Lesson l " +
            "WHERE l.id = :lessonId AND l.chapter.id = :chapterId AND l.chapter.course.id = :courseId")
    boolean existsByIdAndChapterIdAndCourseId(
            @Param("lessonId") Long lessonId,
            @Param("chapterId") Long chapterId,
            @Param("courseId") Long courseId);

    /**
     * Tìm lesson theo id, chapterId và courseId
     * Đảm bảo lesson thuộc về chapter và chapter thuộc về course
     */
    @Query("SELECT l FROM Lesson l " +
            "WHERE l.id = :lessonId " +
            "AND l.chapter.id = :chapterId " +
            "AND l.chapter.course.id = :courseId")
    Optional<Lesson> findByIdAndChapter_IdAndChapter_Course_Id(
            @Param("lessonId") Long lessonId,
            @Param("chapterId") Long chapterId,
            @Param("courseId") Long courseId);
}

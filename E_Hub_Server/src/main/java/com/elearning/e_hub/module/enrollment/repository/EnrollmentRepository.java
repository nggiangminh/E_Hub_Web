package com.elearning.e_hub.module.enrollment.repository;

import com.elearning.e_hub.module.enrollment.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    /**
     * Kiểm tra tồn tại ghi danh theo userId và courseId
     */
    @Query("SELECT COUNT(e) > 0 FROM Enrollment e WHERE e.userId.id = :userId AND e.courseId.id = :courseId")
    boolean existsByUserIdAndCourseId(@Param("userId") Long userId, @Param("courseId") Long courseId);

    /**
     * Tìm danh sách ghi danh theo userId
     */
    @Query("SELECT e FROM Enrollment e WHERE e.userId.id = :userId")
    List<Enrollment> findByUserId(@Param("userId") Long userId);

    /**
     * Tìm danh sách ghi danh theo courseId
     */
    @Query("SELECT e FROM Enrollment e WHERE e.courseId.id = :courseId")
    List<Enrollment> findByCourseId(@Param("courseId") Long courseId);
}

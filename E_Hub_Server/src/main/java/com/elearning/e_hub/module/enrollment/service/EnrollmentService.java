package com.elearning.e_hub.module.enrollment.service;

import com.elearning.e_hub.module.enrollment.dto.EnrollmentRequest;
import com.elearning.e_hub.module.enrollment.dto.EnrollmentResponse;
import com.elearning.e_hub.module.enrollment.enums.EnrollmentStatus;

import java.util.List;

/**
 * Service interface cho nghiệp vụ ghi danh khoá học.
 * Tuân thủ SOLID, DRY, KISS, YAGNI, OWASP.
 * Chỉ khai báo method, không chứa logic.
 * Trả về DTO, không trả về Entity.
 */
public interface EnrollmentService {
    /**
     * Tạo mới ghi danh khoá học.
     *
     * @param request thông tin ghi danh
     * @return EnrollmentResponse
     */
    EnrollmentResponse enroll(EnrollmentRequest request);

    /**
     * Lấy thông tin ghi danh theo id.
     *
     * @param id mã ghi danh
     * @return EnrollmentResponse
     */
    EnrollmentResponse getById(Long id);

    /**
     * Cập nhật thông tin ghi danh.
     *
     * @param id      mã ghi danh
     * @param request thông tin cập nhật
     * @return EnrollmentResponse
     */
    EnrollmentResponse update(Long id, EnrollmentRequest request);

    /**
     * Huỷ ghi danh.
     *
     * @param id mã ghi danh
     */
    void cancel(Long id);

    /**
     * Đổi trạng thái ghi danh.
     *
     * @param id     mã ghi danh
     * @param status trạng thái mới
     * @return EnrollmentResponse
     */
    EnrollmentResponse changeStatus(Long id, EnrollmentStatus status);

    /**
     * Kiểm tra tồn tại ghi danh theo user và course.
     *
     * @param userId   mã user
     * @param courseId mã khoá học
     * @return true nếu tồn tại
     */
    boolean existsByUserAndCourse(Long userId, Long courseId);

    /**
     * Lấy danh sách ghi danh theo user.
     *
     * @param userId mã user
     * @return danh sách EnrollmentResponse
     */
    List<EnrollmentResponse> findByUserId(Long userId);

    /**
     * Lấy danh sách ghi danh theo khoá học.
     *
     * @param courseId mã khoá học
     * @return danh sách EnrollmentResponse
     */
    List<EnrollmentResponse> findByCourseId(Long courseId);

}

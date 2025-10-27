// java
package com.elearning.e_hub.module.enrollment.service;

import com.elearning.e_hub.module.enrollment.dto.EnrollmentRequest;
import com.elearning.e_hub.module.enrollment.dto.EnrollmentResponse;
import com.elearning.e_hub.module.enrollment.enums.EnrollmentStatus;

import java.util.List;

public interface EnrollmentService {

    EnrollmentResponse create(EnrollmentRequest request);

    EnrollmentResponse getById(Long id);

    EnrollmentResponse update(Long id, EnrollmentRequest dto);

    void cancel(Long id);

    EnrollmentResponse changeStatus(Long id, EnrollmentStatus status);

    boolean existsByUserAndCourse(Long userId, Long courseId);

    List<EnrollmentResponse> findByUserId(Long userId);

    List<EnrollmentResponse> findByCourseId(Long courseId);

//    /** Tìm kiếm / phân trang theo tiêu chí (filter, sort, paging) */
//    Page<EnrollmentResponse> search(EnrollmentSearchCriteria criteria, Pageable pageable);
}

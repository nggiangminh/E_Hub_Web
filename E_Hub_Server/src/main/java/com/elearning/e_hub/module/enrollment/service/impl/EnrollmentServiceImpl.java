package com.elearning.e_hub.module.enrollment.service.impl;

import com.elearning.e_hub.module.enrollment.dto.EnrollmentRequest;
import com.elearning.e_hub.module.enrollment.dto.EnrollmentResponse;
import com.elearning.e_hub.module.enrollment.enums.EnrollmentStatus;
import com.elearning.e_hub.module.enrollment.service.EnrollmentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentServiceImpl implements EnrollmentService {

    @Override
    public EnrollmentResponse create(EnrollmentRequest dto) {
        return null;
    }

    @Override
    public EnrollmentResponse getById(Long id) {
        return null;
    }

    @Override
    public EnrollmentResponse update(Long id, EnrollmentRequest dto) {
        return null;
    }

    @Override
    public void cancel(Long id) {

    }

    @Override
    public EnrollmentResponse changeStatus(Long id, EnrollmentStatus status) {
        return null;
    }

    @Override
    public boolean existsByUserAndCourse(Long userId, Long courseId) {
        return false;
    }

    @Override
    public List<EnrollmentResponse> findByUserId(Long userId) {
        return List.of();
    }

    @Override
    public List<EnrollmentResponse> findByCourseId(Long courseId) {
        return List.of();
    }
}

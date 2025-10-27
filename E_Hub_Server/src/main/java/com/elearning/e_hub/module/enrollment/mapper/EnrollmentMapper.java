package com.elearning.e_hub.module.enrollment.mapper;

import com.elearning.e_hub.module.enrollment.dto.EnrollmentRequest;
import com.elearning.e_hub.module.enrollment.dto.EnrollmentResponse;
import com.elearning.e_hub.module.enrollment.entity.Enrollment;

public class EnrollmentMapper {
    private EnrollmentMapper() {

    }

    public static Enrollment toEntity(EnrollmentRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Enrollment Request can not be null");
        }
        Enrollment enrollment = new Enrollment();
        updateFromRequest(enrollment, request);
        return enrollment;
    }

    public static void updateFromRequest(Enrollment enrollment, EnrollmentRequest request) {
        if (enrollment == null || request == null) {
            throw new IllegalArgumentException("enrollment and enrollment");
        }

        try {
            enrollment.setStatus(request.status());
        } catch (Exception ex) {
            throw new IllegalArgumentException("Error updating enrollment: " + ex.getMessage());
        }
    }

    public static EnrollmentResponse toResponse(Enrollment enrollment) {
        if (enrollment == null) {
            throw new IllegalArgumentException("Enrollment cannot be null");
        }
        return new EnrollmentResponse(
                enrollment.getId(),
                enrollment.getUserId(),
                enrollment.getCourseId(),
                enrollment.getEnrolledAt(),
                enrollment.getStatus()
        );
    }
}

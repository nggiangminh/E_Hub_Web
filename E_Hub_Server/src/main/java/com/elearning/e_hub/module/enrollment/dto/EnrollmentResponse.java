package com.elearning.e_hub.module.enrollment.dto;

import com.elearning.e_hub.module.enrollment.enums.EnrollmentStatus;

import java.time.LocalDateTime;

public record EnrollmentResponse(
        Long id,
        Long userId,
        Long courseId,
        LocalDateTime enrolledAt,
        EnrollmentStatus status
) {

}

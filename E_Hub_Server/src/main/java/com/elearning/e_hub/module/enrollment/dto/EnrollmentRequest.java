package com.elearning.e_hub.module.enrollment.dto;

import com.elearning.e_hub.module.enrollment.enums.EnrollmentStatus;
import jakarta.validation.constraints.NotNull;

public record EnrollmentRequest(
        @NotNull Long userId,
        @NotNull Long courseId,
        @NotNull EnrollmentStatus status
) {
    public EnrollmentRequest {
        if (userId == null || courseId == null || status == null)
            throw new IllegalArgumentException("All fields must be provided and not blank");
    }
}

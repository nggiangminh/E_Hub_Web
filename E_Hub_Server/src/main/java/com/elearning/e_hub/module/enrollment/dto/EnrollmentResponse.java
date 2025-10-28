package com.elearning.e_hub.module.enrollment.dto;

import com.elearning.e_hub.module.course.entity.Course;
import com.elearning.e_hub.module.enrollment.enums.EnrollmentStatus;
import com.elearning.e_hub.module.user.entity.User;

import java.time.LocalDateTime;

public record EnrollmentResponse(
        Long id,
        Long userId,
        Long courseId,
        LocalDateTime enrolledAt,
        EnrollmentStatus status
) {

}

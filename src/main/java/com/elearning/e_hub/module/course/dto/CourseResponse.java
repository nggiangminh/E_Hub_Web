package com.elearning.e_hub.module.course.dto;

import com.elearning.e_hub.module.course.enums.CourseLevel;
import com.elearning.e_hub.module.course.enums.CourseStatus;

import java.time.LocalDateTime;

public record CourseResponse(
        Long id,
        String title,
        String description,
        CourseLevel level,
        CourseStatus status,
        Long instructorId,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}

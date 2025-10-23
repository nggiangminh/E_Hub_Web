package com.elearning.e_hub.module.course.dto;

import java.time.LocalDateTime;

public record ChapterResponse(
        Long id,
        String title,
        String description,
        Integer orderIndex,
        Long courseId,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}

package com.elearning.e_hub.module.course.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record LessonRequest(
        Long id,
        @NotEmpty
        @Size(max = 255) String title,
        @NotEmpty @Size(max = 50) String lessonType,
        @Size(max = 512) String videoUrl,
        String content,
        Integer duration,
        Long chapterId
) {
    public LessonRequest {
        if (title == null || title.isBlank()) throw new IllegalArgumentException("Title không được để trống");
        if (lessonType == null || lessonType.isBlank()) throw new IllegalArgumentException("Type không được để trống");
    }
}

package com.elearning.e_hub.module.course.dto;

import com.elearning.e_hub.module.course.enums.LessonType;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.Set;

public record LessonResponse(
    @NotNull Long id,

    @NotBlank String title,

    String description,

    String content,

    String contentPreview,

    @NotNull LessonType lessonType,

    String videoUrl,

    Integer durationSeconds,

    Integer orderIndex,

    @NotNull Long chapterId,

    Boolean published,

    Set<String> resources,

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime createdAt,

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime updatedAt
) {
    // Compact constructor để validate và set default values
    public LessonResponse {
        if (durationSeconds == null) durationSeconds = 0;
        if (orderIndex == null) orderIndex = 0;
        if (published == null) published = false;
        if (resources == null) resources = Set.of();
    }
}

package com.elearning.e_hub.module.course.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ChapterRequest(
        @NotBlank
        @Size(min = 1, max = 100)
        String title,
        @NotBlank
        @Size(max = 1000)
        String description,
        @NotNull Integer orderIndex,
        @NotNull Long courseId
) {
    public ChapterRequest {
        if (title == null || description == null) throw new IllegalArgumentException("Invalid course data");
        if (orderIndex == null) throw new IllegalArgumentException("Invalid course data");
        if (courseId == null) throw new IllegalArgumentException("Invalid course data");
    }
}

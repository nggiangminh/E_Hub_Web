package com.elearning.e_hub.module.course.dto;

import com.elearning.e_hub.module.course.enums.LessonType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.util.Set;

public record LessonRequest(
    @NotBlank(message = "Tiêu đề không được để trống")
    @Size(min = 1, max = 100, message = "Tiêu đề phải từ 1-100 ký tự")
    String title,

    @Size(max = 500, message = "Mô tả không được quá 500 ký tự")
    String description,

    String content,

    @Size(max = 200, message = "Content preview không được quá 200 ký tự")
    String contentPreview,

    @NotNull(message = "Loại bài học không được để trống")
    LessonType lessonType,

    @Size(max = 512, message = "URL video không được quá 512 ký tự")
    String videoUrl,

    @PositiveOrZero(message = "Thời lượng không được âm")
    Integer durationSeconds,

    @PositiveOrZero(message = "Thứ tự không được âm")
    Integer orderIndex,

    @NotNull(message = "ID chương không được để trống")
    Long chapterId,

    Boolean published,

    Set<String> resources
) {
    // Compact constructor để validate và set default values
    public LessonRequest {
        if (durationSeconds == null) durationSeconds = 0;
        if (orderIndex == null) orderIndex = 0;
        if (published == null) published = false;
        if (resources == null) resources = Set.of();
    }
}

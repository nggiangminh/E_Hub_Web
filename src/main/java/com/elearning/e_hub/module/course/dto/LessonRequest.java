package com.elearning.e_hub.module.course.dto;

import com.elearning.e_hub.module.course.enums.LessonType;
import jakarta.validation.constraints.*;

public record LessonRequest(
        @NotBlank(message = "Tiêu đề không được để trống")
        @Size(min = 1, max = 100, message = "Tiêu đề phải từ 1-100 ký tự")
        String title,

        @NotNull(message = "Loại bài học không được để trống")
        LessonType lessonType,

        @Size(max = 512, message = "URL video không được quá 512 ký tự")
        String videoUrl,

        String content,

        @Min(value = 0, message = "Thời lượng không được âm")
        Integer duration,

        @Min(value = 0, message = "Thứ tự không được âm")
        Integer orderIndex
) {
    public LessonRequest {
        if (duration == null) duration = 0;
        if (orderIndex == null) orderIndex = 0;
        if (content == null) content = "";
        if (videoUrl == null) videoUrl = "";
    }
}

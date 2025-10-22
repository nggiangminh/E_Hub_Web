package com.elearning.e_hub.module.course.dto;

import com.elearning.e_hub.module.course.enums.CourseLevel;
import com.elearning.e_hub.module.course.enums.CourseStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CourseRequest(
        @NotBlank
        @Size(min = 1, max = 100)
        String title,

        @Size(max = 1000)
        String description,

        @NotNull
        CourseLevel level,

        @NotNull
        CourseStatus status,

        @NotNull
        Double price
) {
    public CourseRequest {
        if (title == null || description == null) throw new IllegalArgumentException("Invalid course data");
        if (level == null) throw new IllegalArgumentException("Invalid course data");
        if (status == null) throw new IllegalArgumentException("Invalid course data");
        if (price == null || price < 0) throw new IllegalArgumentException("Invalid course data");
    }
}

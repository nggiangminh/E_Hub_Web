package com.elearning.e_hub.module.course.dto;

import com.elearning.e_hub.module.course.enums.CourseLevel;
import com.elearning.e_hub.module.course.enums.CourseStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record CourseRequest(
        @NotBlank(message = "Title is required")
        @Size(min = 1, max = 100, message = "Title must be between 1 and 100 characters")
        String title,

        @NotBlank(message = "Description is required")
        @Size(max = 1000, message = "Description cannot exceed 1000 characters")
        String description,

        @NotNull(message = "Level is required")
        CourseLevel level,

        @NotNull(message = "Status is required")
        CourseStatus status,

        @NotBlank(message = "Author is required")
        String author,

        @NotNull(message = "Price is required")
        @DecimalMin(value = "0.0", message = "Price must be greater than or equal to 0")
        BigDecimal price
) {
    public CourseRequest {
        if (title == null || description == null) throw new IllegalArgumentException("Invalid course data");
        if (level == null) throw new IllegalArgumentException("Invalid course data");
        if (status == null) throw new IllegalArgumentException("Invalid course data");
        if (author == null) throw new IllegalArgumentException("Invalid course data");
        if (price == null || price.compareTo(BigDecimal.ZERO) < 0) throw new IllegalArgumentException("Invalid course data");
    }
}

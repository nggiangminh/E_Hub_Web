package com.elearning.e_hub.module.course.mapper;

import com.elearning.e_hub.module.course.dto.CourseResponse;
import com.elearning.e_hub.module.course.entity.Course;

public class CourseMapper {

    private CourseMapper() {
        // Ngăn tạo instance — mapper này chỉ nên dùng static methods
    }

    public static CourseResponse toResponse(Course course) {
        return new CourseResponse(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getLevel(),
                course.getStatus(),
                course.getInstructorId(),
                course.getCreatedAt(),
                course.getUpdatedAt()
        );
    }
}

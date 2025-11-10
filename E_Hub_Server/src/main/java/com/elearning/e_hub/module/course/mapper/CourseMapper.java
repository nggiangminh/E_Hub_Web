package com.elearning.e_hub.module.course.mapper;

import com.elearning.e_hub.module.course.dto.CourseRequest;
import com.elearning.e_hub.module.course.dto.CourseResponse;
import com.elearning.e_hub.module.course.entity.Course;

public class CourseMapper {

    private CourseMapper() {
        // Prevent instantiation
    }

    public static Course toEntity(CourseRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("CourseRequest cannot be null");
        }

        Course course = new Course();
        updateFromRequest(course, request);
        return course;
    }

    public static void updateFromRequest(Course course, CourseRequest request) {
        if (course == null || request == null) {
            throw new IllegalArgumentException("Course and CourseRequest cannot be null");
        }

        try {
            course.setTitle(request.title());
            course.setDescription(request.description());
            course.setLevel(request.level());
            course.setStatus(request.status());
            course.setAuthor(request.author());
            course.setPrice(request.price());
        } catch (Exception e) {
            throw new IllegalArgumentException("Error updating course: " + e.getMessage());
        }
    }

    public static CourseResponse toResponse(Course course) {
        if (course == null) {
            throw new IllegalArgumentException("Course cannot be null");
        }

        return new CourseResponse(
            course.getId(),
            course.getTitle(),
            course.getDescription(),
            course.getLevel(),
            course.getStatus(),
            course.getAuthor(),
            course.getPrice(),
            course.getCreatedAt(),
            course.getUpdatedAt()
        );
    }
}

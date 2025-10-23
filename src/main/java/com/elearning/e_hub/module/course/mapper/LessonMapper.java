package com.elearning.e_hub.module.course.mapper;

import com.elearning.e_hub.module.course.dto.LessonRequest;
import com.elearning.e_hub.module.course.dto.LessonResponse;
import com.elearning.e_hub.module.course.entity.Lesson;

public class LessonMapper {

    private LessonMapper() {
        // Prevent instantiation
    }

    public static Lesson toEntity(LessonRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("LessonRequest cannot be null");
        }

        Lesson lesson = new Lesson();
        updateFromRequest(lesson, request);
        return lesson;
    }

    public static void updateFromRequest(Lesson lesson, LessonRequest request) {
        if (lesson == null || request == null) {
            throw new IllegalArgumentException("Lesson and LessonRequest cannot be null");
        }

        try {
            lesson.setTitle(request.title());
            lesson.setContent(request.content());
        } catch (Exception e) {
            throw new IllegalArgumentException("Error updating course: " + e.getMessage());
        }
    }

    public static LessonResponse toResponse(Lesson lesson) {
        if (lesson == null) {
            throw new IllegalArgumentException("Course cannot be null");
        }

        return new LessonResponse(
                lesson.getId(),
                lesson.getTitle(),
                lesson.getLessonType(),
                lesson.getContent(),
                lesson.getVideoUrl(),
                lesson.getDuration(),
                lesson.getChapter(),
                lesson.getCreatedAt(),
                lesson.getUpdatedAt()
        );
    }
}

package com.elearning.e_hub.module.course.mapper;

import com.elearning.e_hub.module.course.dto.LessonRequest;
import com.elearning.e_hub.module.course.dto.LessonResponse;
import com.elearning.e_hub.module.course.entity.Lesson;

public class LessonMapper {

    private LessonMapper() {
        // Prevent instantiation
    }

    public static void updateFromRequest(Lesson lesson, LessonRequest request) {
        if (lesson == null || request == null) {
            throw new IllegalArgumentException("Lesson và LessonRequest không được null");
        }

        lesson.setTitle(request.title());
        lesson.setContent(request.content());
        lesson.setLessonType(request.lessonType());
        lesson.setVideoUrl(request.videoUrl());
        lesson.setDuration(request.duration());
        lesson.setOrderIndex(request.orderIndex());
    }

    public static LessonResponse toResponse(Lesson lesson) {
        if (lesson == null) {
            throw new IllegalArgumentException("Lesson không được null");
        }

        return new LessonResponse(
                lesson.getId(),
                lesson.getTitle(),
                lesson.getLessonType(),
                lesson.getVideoUrl(),
                lesson.getContent(),
                lesson.getDuration(),
                lesson.getOrderIndex(),
                lesson.getChapter().getId(),
                lesson.getChapter().getCourse().getId(),
                lesson.getCreatedAt(),
                lesson.getUpdatedAt()
        );
    }
}

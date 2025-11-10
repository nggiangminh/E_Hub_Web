package com.elearning.e_hub.module.course.mapper;

import com.elearning.e_hub.module.course.dto.LessonRequest;
import com.elearning.e_hub.module.course.dto.LessonResponse;
import com.elearning.e_hub.module.course.entity.Chapter;
import com.elearning.e_hub.module.course.entity.Lesson;
import org.springframework.stereotype.Component;

@Component
public class LessonMapper {

    public Lesson toEntity(LessonRequest request, Chapter chapter) {
        Lesson lesson = new Lesson();
        lesson.setTitle(request.title());
        lesson.setDescription(request.description());
        lesson.setContent(request.content());
        lesson.setContentPreview(request.contentPreview());
        lesson.setLessonType(request.lessonType());
        lesson.setVideoUrl(request.videoUrl());
        lesson.setDurationSeconds(request.durationSeconds());
        lesson.setOrderIndex(request.orderIndex());
        lesson.setPublished(request.published());
        lesson.setResources(request.resources());
        lesson.setChapter(chapter);
        return lesson;
    }

    public void updateEntityFromRequest(Lesson lesson, LessonRequest request) {
        lesson.setTitle(request.title());
        lesson.setDescription(request.description());
        lesson.setContent(request.content());
        lesson.setContentPreview(request.contentPreview());
        lesson.setLessonType(request.lessonType());
        lesson.setVideoUrl(request.videoUrl());
        lesson.setDurationSeconds(request.durationSeconds());
        lesson.setOrderIndex(request.orderIndex());
        lesson.setPublished(request.published());
        lesson.setResources(request.resources());
    }

    public LessonResponse toResponse(Lesson lesson) {
        return new LessonResponse(
            lesson.getId(),
            lesson.getTitle(),
            lesson.getDescription(),
            lesson.getContent(),
            lesson.getContentPreview(),
            lesson.getLessonType(),
            lesson.getVideoUrl(),
            lesson.getDurationSeconds(),
            lesson.getOrderIndex(),
            lesson.getChapter().getId(),
            lesson.getPublished(),
            lesson.getResources(),
            lesson.getCreatedAt(),
            lesson.getUpdatedAt()
        );
    }
}

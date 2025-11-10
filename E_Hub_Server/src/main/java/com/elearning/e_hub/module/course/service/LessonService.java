package com.elearning.e_hub.module.course.service;

import com.elearning.e_hub.module.course.dto.LessonRequest;
import com.elearning.e_hub.module.course.dto.LessonResponse;

import java.util.List;
import java.util.Set;

public interface LessonService {
    LessonResponse createLesson(Long courseId, Long chapterId, LessonRequest request);

    LessonResponse getLessonById(Long courseId, Long chapterId, Long lessonId);

    List<LessonResponse> getLessonsByChapterId(Long courseId, Long chapterId);

    LessonResponse updateLesson(Long courseId, Long chapterId, Long lessonId, LessonRequest request);

    void deleteLesson(Long courseId, Long chapterId, Long lessonId);

    LessonResponse publishLesson(Long courseId, Long chapterId, Long lessonId);

    LessonResponse unpublishLesson(Long courseId, Long chapterId, Long lessonId);

    LessonResponse uploadContent(Long courseId, Long chapterId, Long lessonId, Set<String> resources);

    LessonResponse getContent(Long courseId, Long chapterId, Long lessonId);

    void deleteContent(Long courseId, Long chapterId, Long lessonId);

}

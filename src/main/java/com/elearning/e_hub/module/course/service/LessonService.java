package com.elearning.e_hub.module.course.service;

import com.elearning.e_hub.module.course.dto.LessonRequest;
import com.elearning.e_hub.module.course.dto.LessonResponse;

import java.util.List;

public interface LessonService {
    LessonResponse createLesson(Long courseId, Long chapterId, LessonRequest request);

    LessonResponse getLessonById(Long courseId, Long chapterId, Long lessonId);

    List<LessonResponse> getLessonsByChapter(Long courseId, Long chapterId);

    LessonResponse updateLesson(Long courseId, Long chapterId, Long lessonId, LessonRequest request);

    void deleteLesson(Long courseId, Long chapterId, Long lessonId);
}


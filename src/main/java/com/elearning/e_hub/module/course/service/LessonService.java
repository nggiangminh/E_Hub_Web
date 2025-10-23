package com.elearning.e_hub.module.course.service;

import com.elearning.e_hub.module.course.dto.LessonRequest;
import com.elearning.e_hub.module.course.dto.LessonResponse;

import java.util.List;

public interface LessonService {
    LessonResponse createLesson(LessonRequest request);

    LessonResponse getLesson(Long id);

    List<LessonResponse> getLessonsByChapter(Long chapterId);

    List<LessonResponse> getAllLesson();

    LessonResponse updateLesson(Long id, LessonRequest request);

    void deleteLesson(Long id);
}


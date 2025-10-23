package com.elearning.e_hub.module.course.service;

import com.elearning.e_hub.module.course.dto.ChapterRequest;
import com.elearning.e_hub.module.course.dto.ChapterResponse;

import java.util.List;

public interface ChapterService {
    ChapterResponse createChapter(Long courseId, ChapterRequest chapterRequest);

    ChapterResponse updateChapter(Long courseId, Long chapterId, ChapterRequest chapterRequest);

    void deleteChapter(Long courseId, Long chapterId);

    ChapterResponse getChapterById(Long courseId, Long chapterId);

    List<ChapterResponse> getAllChaptersByCourseId(Long courseId);
}

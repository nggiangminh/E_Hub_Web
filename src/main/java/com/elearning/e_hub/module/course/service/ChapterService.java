package com.elearning.e_hub.module.course.service;

import com.elearning.e_hub.module.course.dto.ChapterRequest;
import com.elearning.e_hub.module.course.dto.ChapterResponse;
import com.elearning.e_hub.module.course.entity.Chapter;

import java.util.List;

public interface ChapterService {
    ChapterResponse createChapter(ChapterRequest chapterRequest);

    ChapterResponse updateChapter(Long id, ChapterRequest chapterRequest);

    void deleteChapter(Long id);

    ChapterResponse getChapterById(Long courseId);

    List<ChapterResponse> getAllChapters();

}

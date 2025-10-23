package com.elearning.e_hub.module.course.service.impl;

import com.elearning.e_hub.module.course.dto.ChapterRequest;
import com.elearning.e_hub.module.course.dto.ChapterResponse;
import com.elearning.e_hub.module.course.entity.Chapter;
import com.elearning.e_hub.module.course.service.ChapterService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChapterServiceImpl implements ChapterService {
    @Override
    public ChapterResponse createChapter(ChapterRequest chapterRequest) {
        return null;
    }

    @Override
    public ChapterResponse updateChapter(Long id, ChapterRequest chapterRequest) {
        return null;
    }

    @Override
    public void deleteChapter(Long id) {

    }

    @Override
    public ChapterResponse getChapterByCourse(Long courseId) {
        return null;
    }

    @Override
    public List<Chapter> getAllChapters(Integer id) {
        return List.of();
    }
}

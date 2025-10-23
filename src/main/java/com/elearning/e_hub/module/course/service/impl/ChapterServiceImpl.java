package com.elearning.e_hub.module.course.service.impl;

import com.elearning.e_hub.module.course.dto.ChapterRequest;
import com.elearning.e_hub.module.course.dto.ChapterResponse;
import com.elearning.e_hub.module.course.entity.Chapter;
import com.elearning.e_hub.module.course.mapper.ChapterMapper;
import com.elearning.e_hub.module.course.repository.ChapterRepository;
import com.elearning.e_hub.module.course.service.ChapterService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChapterServiceImpl implements ChapterService {
    private static final String CHAPTER_NOT_FOUND = "Chapter not found";
    private final ChapterRepository chapterRepository;

    public ChapterServiceImpl(ChapterRepository chapterRepository) {
        this.chapterRepository = chapterRepository;
    }

    @Override
    public ChapterResponse createChapter(ChapterRequest chapterRequest) {
        Chapter chapter = new Chapter();
        chapter.setTitle(chapterRequest.title());
        chapter.setDescription(chapterRequest.description());
        Chapter saved = chapterRepository.save(chapter);
        return ChapterMapper.toResponse(saved);
    }

    @Override
    public ChapterResponse updateChapter(Long id, ChapterRequest chapterRequest) {
        Chapter chapter = chapterRepository.findById(id).orElseThrow();
        chapter.setTitle(chapterRequest.title());
        chapter.setDescription(chapterRequest.description());
        Chapter updated = chapterRepository.save(chapter);
        return ChapterMapper.toResponse(updated);
    }

    @Override
    public void deleteChapter(Long id) {
        Chapter chapter = chapterRepository.findById(id).orElseThrow();
        chapterRepository.delete(chapter);

    }

    @Override
    public ChapterResponse getChapterById(Long id) {
        Chapter chapter = chapterRepository.findById(id).orElseThrow(() -> new RuntimeException(CHAPTER_NOT_FOUND));
        return ChapterMapper.toResponse(chapter);
    }

    @Override
    public List<ChapterResponse> getAllChapters() {
        return chapterRepository.findAll().stream().map(ChapterMapper::toResponse).toList();
    }
}

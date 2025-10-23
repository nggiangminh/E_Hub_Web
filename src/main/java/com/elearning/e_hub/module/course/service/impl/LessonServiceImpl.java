package com.elearning.e_hub.module.course.service.impl;

import com.elearning.e_hub.common.exception.AppException;
import com.elearning.e_hub.common.exception.ErrorCode;
import com.elearning.e_hub.module.course.dto.LessonRequest;
import com.elearning.e_hub.module.course.dto.LessonResponse;
import com.elearning.e_hub.module.course.entity.Lesson;
import com.elearning.e_hub.module.course.mapper.LessonMapper;
import com.elearning.e_hub.module.course.repository.LessonRepository;
import com.elearning.e_hub.module.course.service.LessonService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonServiceImpl implements LessonService {
    private static final String LESSON_NOT_FOUND = "Lesson not found";

    private final LessonRepository lessonRepository;

    public LessonServiceImpl(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    @Override
    public LessonResponse createLesson(LessonRequest request) {
        Lesson lesson = new Lesson();
        lesson.setTitle(request.title());
        lesson.setContent(request.content());
        lesson.setDuration(request.duration());
        Lesson saved = lessonRepository.save(lesson);
        return LessonMapper.toResponse(saved);
    }

    @Override
    public LessonResponse getLesson(Long id) {
        Lesson lesson = lessonRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND, LESSON_NOT_FOUND));
        return LessonMapper.toResponse(lesson);
    }

    @Override
    public List<LessonResponse> getLessonsByChapter(Long chapterId) {
        return List.of();
    }

    @Override
    public List<LessonResponse> getAllLesson() {
        return lessonRepository.findAll().stream()
                .map(LessonMapper::toResponse)
                .toList();
    }

    @Override
    public LessonResponse updateLesson(Long id, LessonRequest request) {
        Lesson lesson = lessonRepository.findById(id).orElseThrow(()
                -> new AppException(ErrorCode.COURSE_NOT_FOUND, LESSON_NOT_FOUND));
        lesson.setTitle(request.title());
        lesson.setContent(request.content());
        lesson.setVideoUrl(request.videoUrl());
        lesson.setDuration(request.duration());
        Lesson updated = lessonRepository.save(lesson);
        return LessonMapper.toResponse(updated);
    }

    @Override
    public void deleteLesson(Long id) {
        Lesson lesson = lessonRepository.findById(id).orElseThrow(()
                -> new AppException(ErrorCode.COURSE_NOT_FOUND, LESSON_NOT_FOUND));
        lessonRepository.delete(lesson);
    }
}

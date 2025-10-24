package com.elearning.e_hub.module.course.service.impl;

import com.elearning.e_hub.common.exception.AppException;
import com.elearning.e_hub.common.exception.ErrorCode;
import com.elearning.e_hub.module.course.dto.LessonRequest;
import com.elearning.e_hub.module.course.dto.LessonResponse;
import com.elearning.e_hub.module.course.entity.Chapter;
import com.elearning.e_hub.module.course.entity.Lesson;
import com.elearning.e_hub.module.course.mapper.LessonMapper;
import com.elearning.e_hub.module.course.repository.ChapterRepository;
import com.elearning.e_hub.module.course.repository.CourseRepository;
import com.elearning.e_hub.module.course.repository.LessonRepository;
import com.elearning.e_hub.module.course.service.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LessonServiceImpl implements LessonService {

    private final LessonRepository lessonRepository;
    private final ChapterRepository chapterRepository;
    private final CourseRepository courseRepository;
    private final LessonMapper lessonMapper;

    @Override
    @Transactional
    public LessonResponse createLesson(Long courseId, Long chapterId, LessonRequest request) {
        Chapter chapter = chapterRepository.findByIdAndCourseId(chapterId, courseId)
                .orElseThrow(() -> new AppException(ErrorCode.CHAPTER_NOT_FOUND));

        Lesson lesson = lessonMapper.toEntity(request, chapter);
        lesson = lessonRepository.save(lesson);

        return lessonMapper.toResponse(lesson);
    }

    @Override
    public LessonResponse getLessonById(Long courseId, Long chapterId, Long lessonId) {
        Lesson lesson = lessonRepository.findByIdAndChapter_IdAndChapter_Course_Id(lessonId, chapterId, courseId)
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND));

        return lessonMapper.toResponse(lesson);
    }

    @Override
    public List<LessonResponse> getLessonsByChapterId(Long courseId, Long chapterId) {
        return lessonRepository.findByChapterIdOrderByOrderIndexAsc(chapterId)
                .stream()
                .map(lessonMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional
    public LessonResponse updateLesson(Long courseId, Long chapterId, Long lessonId, LessonRequest request) {
        Lesson lesson = lessonRepository.findByIdAndChapter_IdAndChapter_Course_Id(lessonId, chapterId, courseId)
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND));

        lessonMapper.updateEntityFromRequest(lesson, request);
        lesson = lessonRepository.save(lesson);

        return lessonMapper.toResponse(lesson);
    }

    @Override
    @Transactional
    public void deleteLesson(Long courseId, Long chapterId, Long lessonId) {
        Lesson lesson = lessonRepository.findByIdAndChapter_IdAndChapter_Course_Id(lessonId, chapterId, courseId)
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND));

        lessonRepository.delete(lesson);
    }

    @Override
    @Transactional
    public LessonResponse publishLesson(Long courseId, Long chapterId, Long lessonId) {
        Lesson lesson = lessonRepository.findByIdAndChapter_IdAndChapter_Course_Id(lessonId, chapterId, courseId)
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND));

        lesson.setPublished(true);
        lesson = lessonRepository.save(lesson);

        return lessonMapper.toResponse(lesson);
    }

    @Override
    @Transactional
    public LessonResponse unpublishLesson(Long courseId, Long chapterId, Long lessonId) {
        Lesson lesson = lessonRepository.findByIdAndChapter_IdAndChapter_Course_Id(lessonId, chapterId, courseId)
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND));

        lesson.setPublished(false);
        lesson = lessonRepository.save(lesson);

        return lessonMapper.toResponse(lesson);
    }

    @Override
    @Transactional
    public LessonResponse uploadContent(Long courseId, Long chapterId, Long lessonId, Set<String> resources) {
        Lesson lesson = lessonRepository.findByIdAndChapter_IdAndChapter_Course_Id(lessonId, chapterId, courseId)
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND));
        lesson.setResources(resources);
        lessonRepository.save(lesson);
        return lessonMapper.toResponse(lesson);
    }

    @Override
    public LessonResponse getContent(Long courseId, Long chapterId, Long lessonId) {
        Lesson lesson = lessonRepository.findByIdAndChapter_IdAndChapter_Course_Id(lessonId, chapterId, courseId)
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND));
        return lessonMapper.toResponse(lesson);
    }

    @Override
    @Transactional
    public void deleteContent(Long courseId, Long chapterId, Long lessonId) {
        Lesson lesson = lessonRepository.findByIdAndChapter_IdAndChapter_Course_Id(lessonId, chapterId, courseId)
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND));
        lesson.getResources().clear();
        lessonRepository.save(lesson);
    }

}

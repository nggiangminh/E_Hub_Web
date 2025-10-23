package com.elearning.e_hub.module.course.service.impl;

import com.elearning.e_hub.common.exception.AppException;
import com.elearning.e_hub.common.exception.ErrorCode;
import com.elearning.e_hub.module.course.dto.LessonRequest;
import com.elearning.e_hub.module.course.dto.LessonResponse;
import com.elearning.e_hub.module.course.entity.Chapter;
import com.elearning.e_hub.module.course.entity.Course;
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

@Service
@RequiredArgsConstructor
@Transactional
public class LessonServiceImpl implements LessonService {

    private final LessonRepository lessonRepository;
    private final ChapterRepository chapterRepository;
    private final CourseRepository courseRepository;

    @Override
    public LessonResponse createLesson(Long courseId, Long chapterId, LessonRequest request) {
        // Kiểm tra course có tồn tại không
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND, "Course not found with id: " + courseId));

        // Kiểm tra chapter có thuộc course này không
        Chapter chapter = chapterRepository.findByIdAndCourseId(chapterId, courseId)
                .orElseThrow(() -> new AppException(ErrorCode.CHAPTER_NOT_FOUND, "Chapter not found with id: " + chapterId));

        Lesson lesson = new Lesson();
        lesson.setTitle(request.title());
        lesson.setContent(request.content());
        lesson.setVideoUrl(request.videoUrl());
        lesson.setDuration(request.duration());
        lesson.setChapter(chapter);

        Lesson saved = lessonRepository.save(lesson);
        return LessonMapper.toResponse(saved);
    }

    @Override
    public LessonResponse getLessonById(Long courseId, Long chapterId, Long lessonId) {
        courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND, "Course not found with id: " + courseId));

        chapterRepository.findByIdAndCourseId(chapterId, courseId)
                .orElseThrow(() -> new AppException(ErrorCode.CHAPTER_NOT_FOUND, "Chapter not found with id: " + chapterId));

        Lesson lesson = lessonRepository.findByIdAndChapterId(lessonId, chapterId)
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND, "Lesson not found with id: " + lessonId));

        return LessonMapper.toResponse(lesson);
    }

    @Override
    public List<LessonResponse> getLessonsByChapter(Long courseId, Long chapterId) {
        courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND, "Course not found with id: " + courseId));

        chapterRepository.findByIdAndCourseId(chapterId, courseId)
                .orElseThrow(() -> new AppException(ErrorCode.CHAPTER_NOT_FOUND, "Chapter not found with id: " + chapterId));

        return lessonRepository.findByChapterIdOrderByOrderIndexAsc(chapterId)
                .stream()
                .map(LessonMapper::toResponse)
                .toList();
    }

    @Override
    public LessonResponse updateLesson(Long courseId, Long chapterId, Long lessonId, LessonRequest request) {
        courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND, "Course not found with id: " + courseId));

        chapterRepository.findByIdAndCourseId(chapterId, courseId)
                .orElseThrow(() -> new AppException(ErrorCode.CHAPTER_NOT_FOUND, "Chapter not found with id: " + chapterId));

        Lesson lesson = lessonRepository.findByIdAndChapterId(lessonId, chapterId)
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND, "Lesson not found with id: " + lessonId));

        lesson.setTitle(request.title());
        lesson.setContent(request.content());
        lesson.setVideoUrl(request.videoUrl());
        lesson.setDuration(request.duration());

        Lesson updated = lessonRepository.save(lesson);
        return LessonMapper.toResponse(updated);
    }

    @Override
    public void deleteLesson(Long courseId, Long chapterId, Long lessonId) {
        courseRepository.findById(courseId)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND, "Course not found with id: " + courseId));

        chapterRepository.findByIdAndCourseId(chapterId, courseId)
                .orElseThrow(() -> new AppException(ErrorCode.CHAPTER_NOT_FOUND, "Chapter not found with id: " + chapterId));

        Lesson lesson = lessonRepository.findByIdAndChapterId(lessonId, chapterId)
                .orElseThrow(() -> new AppException(ErrorCode.LESSON_NOT_FOUND, "Lesson not found with id: " + lessonId));

        lessonRepository.delete(lesson);
    }
}

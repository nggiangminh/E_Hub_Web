package com.elearning.e_hub.module.course.service.impl;

import com.elearning.e_hub.common.exception.AppException;
import com.elearning.e_hub.common.exception.ErrorCode;
import com.elearning.e_hub.module.course.dto.ChapterRequest;
import com.elearning.e_hub.module.course.dto.ChapterResponse;
import com.elearning.e_hub.module.course.entity.Chapter;
import com.elearning.e_hub.module.course.entity.Course;
import com.elearning.e_hub.module.course.mapper.ChapterMapper;
import com.elearning.e_hub.module.course.repository.ChapterRepository;
import com.elearning.e_hub.module.course.repository.CourseRepository;
import com.elearning.e_hub.module.course.service.ChapterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ChapterServiceImpl implements ChapterService {

    private final ChapterRepository chapterRepository;
    private final CourseRepository courseRepository;

    private static final String courseNotFound = "Course not found with id: ";

    @Override
    public ChapterResponse createChapter(Long courseId, ChapterRequest chapterRequest) {
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND, courseNotFound + courseId));

        Chapter chapter = new Chapter();
        chapter.setTitle(chapterRequest.title());
        chapter.setDescription(chapterRequest.description());
        chapter.setCourse(course);

        Chapter saved = chapterRepository.save(chapter);
        return ChapterMapper.toResponse(saved);
    }

    @Override
    public ChapterResponse updateChapter(Long courseId, Long chapterId, ChapterRequest chapterRequest) {
        courseRepository.findById(courseId).orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND, courseNotFound + courseId));

        Chapter chapter = chapterRepository.findByIdAndCourseId(chapterId, courseId).orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND, courseNotFound + courseId));

        chapter.setTitle(chapterRequest.title());
        chapter.setDescription(chapterRequest.description());

        Chapter updated = chapterRepository.save(chapter);
        return ChapterMapper.toResponse(updated);
    }

    @Override
    public void deleteChapter(Long courseId, Long chapterId) {
        courseRepository.findById(courseId).orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND, courseNotFound + courseId));

        Chapter chapter = chapterRepository.findByIdAndCourseId(chapterId, courseId).orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND, courseNotFound + courseId));

        chapterRepository.delete(chapter);
    }

    @Override
    public ChapterResponse getChapterById(Long courseId, Long chapterId) {
        courseRepository.findById(courseId).orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND, courseNotFound + courseId));

        Chapter chapter = chapterRepository.findByIdAndCourseId(chapterId, courseId).orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND, courseNotFound + courseId));

        return ChapterMapper.toResponse(chapter);
    }

    @Override
    public List<ChapterResponse> getAllChaptersByCourseId(Long courseId) {
        courseRepository.findById(courseId).orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND, courseNotFound + courseId));

        return chapterRepository.findByCourseIdOrderByOrderIndexAsc(courseId).stream().map(ChapterMapper::toResponse).toList();
    }
}

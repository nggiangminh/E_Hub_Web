package com.elearning.e_hub.module.course.service.impl;

import com.elearning.e_hub.common.exception.AppException;
import com.elearning.e_hub.common.exception.ErrorCode;
import com.elearning.e_hub.module.course.dto.CourseRequest;
import com.elearning.e_hub.module.course.dto.CourseResponse;
import com.elearning.e_hub.module.course.entity.Course;
import com.elearning.e_hub.module.course.mapper.CourseMapper;
import com.elearning.e_hub.module.course.repository.CourseRepository;
import com.elearning.e_hub.module.course.service.CourseService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    private static final String COURSE_NOT_FOUND = "Course not found";
    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public CourseResponse createCourse(CourseRequest courseRequest) {
        Course course = new Course();
        course.setTitle(courseRequest.title());
        course.setDescription(courseRequest.description());
        course.setLevel(courseRequest.level());
        course.setStatus(courseRequest.status());
        course.setAuthor(courseRequest.author());
        course.setPrice(courseRequest.price());
        Course saved = courseRepository.save(course);
        return CourseMapper.toResponse(saved);
    }

    @Override
    public CourseResponse updateCourse(Long id, CourseRequest courseRequest) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND, COURSE_NOT_FOUND));
        course.setTitle(courseRequest.title());
        course.setDescription(courseRequest.description());
        course.setLevel(courseRequest.level());
        course.setStatus(courseRequest.status());
        course.setPrice(courseRequest.price());
        Course updated = courseRepository.save(course);
        return CourseMapper.toResponse(updated);
    }

    @Override
    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND, COURSE_NOT_FOUND));
        courseRepository.delete(course);
    }

    @Override
    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.COURSE_NOT_FOUND, COURSE_NOT_FOUND));
        return CourseMapper.toResponse(course);
    }

    @Override
    public List<CourseResponse> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(CourseMapper::toResponse)
                .toList();
    }

    @Override
    public List<CourseResponse> searchCourses(String keyword) {
        return courseRepository.searchByTitle(keyword).stream()
                .map(CourseMapper::toResponse)
                .toList();
    }
}

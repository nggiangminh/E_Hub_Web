package com.elearning.e_hub.module.course.service.impl;

import com.elearning.e_hub.module.course.dto.CourseRequest;
import com.elearning.e_hub.module.course.dto.CourseResponse;
import com.elearning.e_hub.module.course.service.CourseService;

import java.util.List;

public class CourseServiceImpl implements CourseService {
    @Override
    public CourseResponse createCourse(CourseRequest courseRequest) {
        return null;
    }

    @Override
    public CourseResponse updateCourse(Long id, CourseRequest courseRequest) {
        return null;
    }

    @Override
    public void deleteCourse(Long id) {

    }

    @Override
    public CourseResponse getCourseById(Long id) {
        return null;
    }

    @Override
    public List<CourseResponse> getAllCourses() {
        return List.of();
    }

    @Override
    public List<CourseResponse> searchCourses(String keyword) {
        return List.of();
    }
}

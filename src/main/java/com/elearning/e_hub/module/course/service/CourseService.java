package com.elearning.e_hub.module.course.service;

import com.elearning.e_hub.module.course.dto.CourseRequest;
import com.elearning.e_hub.module.course.dto.CourseResponse;

import java.util.List;

public interface CourseService {
    CourseResponse createCourse(CourseRequest courseRequest);

    CourseResponse updateCourse(Long id, CourseRequest courseRequest);

    void deleteCourse(Long id);

    CourseResponse getCourseById(Long id);

    List<CourseResponse> getAllCourses();

    List<CourseResponse> searchCourses(String keyword);
}

package com.elearning.e_hub.module.enrollment.service.impl;

import com.elearning.e_hub.module.course.entity.Course;
import com.elearning.e_hub.module.course.repository.CourseRepository;
import com.elearning.e_hub.module.enrollment.dto.EnrollmentRequest;
import com.elearning.e_hub.module.enrollment.dto.EnrollmentResponse;
import com.elearning.e_hub.module.enrollment.entity.Enrollment;
import com.elearning.e_hub.module.enrollment.enums.EnrollmentStatus;
import com.elearning.e_hub.module.enrollment.mapper.EnrollmentMapper;
import com.elearning.e_hub.module.enrollment.repository.EnrollmentRepository;
import com.elearning.e_hub.module.enrollment.service.EnrollmentService;
import com.elearning.e_hub.module.user.entity.User;
import com.elearning.e_hub.module.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
public class EnrollmentServiceImpl implements EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;

    private final UserRepository userRepository;

    private final CourseRepository courseRepository;

    public EnrollmentServiceImpl(EnrollmentRepository enrollmentRepository, UserRepository userRepository, CourseRepository courseRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    @Override
    @Transactional
    public EnrollmentResponse enroll(EnrollmentRequest request) {
        User user = userRepository.findById(request.userId()).orElseThrow(() -> new IllegalArgumentException(" User not found"));
        Course course = courseRepository.findById(request.courseId()).orElseThrow(() -> new IllegalArgumentException("Course not found"));

        Enrollment enrollment = new Enrollment();
        enrollment.setUserId(user);
        enrollment.setCourseId(course);
        enrollment.setStatus(request.status());
        enrollment.setEnrolledAt(LocalDateTime.now());

        Enrollment saved = enrollmentRepository.save(enrollment);
        return EnrollmentMapper.toResponse(saved);
    }

    @Override
    public EnrollmentResponse getById(Long id) {
        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Enrollment not found"));
        return EnrollmentMapper.toResponse(enrollment);
    }

    @Override
    @Transactional
    public EnrollmentResponse update(Long id, EnrollmentRequest request) {
        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Enrollment not found"));
        EnrollmentMapper.updateFromRequest(enrollment, request);
        Enrollment updated = enrollmentRepository.save(enrollment);
        return EnrollmentMapper.toResponse(updated);
    }

    @Override
    @Transactional
    public void cancel(Long id) {
        Enrollment enrollment = enrollmentRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Enrollment not found"));
        enrollmentRepository.delete(enrollment);
    }

    @Override
    @Transactional
    public EnrollmentResponse changeStatus(Long id, EnrollmentStatus status) {
        Enrollment enrollment = enrollmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Enrollment not found"));

        enrollment.setStatus(status);
        Enrollment updated = enrollmentRepository.save(enrollment);
        return EnrollmentMapper.toResponse(updated);
    }

    @Override
    public boolean existsByUserAndCourse(Long userId, Long courseId) {
        return enrollmentRepository.existsByUserIdAndCourseId(userId, courseId);
    }

    @Override
    public List<EnrollmentResponse> findByUserId(Long userId) {
        List<Enrollment> enrollments = enrollmentRepository.findByUserId(userId);
        return enrollments.stream()
                .map(EnrollmentMapper::toResponse)
                .toList();
    }

    @Override
    public List<EnrollmentResponse> findByCourseId(Long courseId) {
        List<Enrollment> enrollments = enrollmentRepository.findByCourseId(courseId);
        return enrollments.stream()
                .map(EnrollmentMapper::toResponse)
                .toList();
    }
}

package com.elearning.e_hub.module.enrollment.controller;

import com.elearning.e_hub.common.dto.ApiResponse;
import com.elearning.e_hub.module.enrollment.dto.EnrollmentRequest;
import com.elearning.e_hub.module.enrollment.dto.EnrollmentResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/enrollments/")
public class EnrollmentController {

    @PostMapping
    public ApiResponse<EnrollmentResponse> create(EnrollmentRequest request) {
        return null;
    }

    @GetMapping("/id")
    public ApiResponse<EnrollmentResponse> getById(@PathVariable Long id) {
        return null;
    }

    @PutMapping("/id")
    public ApiResponse<EnrollmentResponse> update(@PathVariable Long id, @Valid @RequestBody EnrollmentRequest request) {
        return null;
    }

    @DeleteMapping("/id")
    public ApiResponse<?> cancel(@PathVariable Long id) {
        return null;
    }

    public ApiResponse<EnrollmentResponse> changeStatus(@PathVariable Long id, @Valid @RequestBody EnrollmentRequest request) {
        return null;
    }

    @GetMapping
    public ApiResponse<List<EnrollmentResponse>> findByUserId(Long userId) {
        return null;
    }

    @GetMapping
    public ApiResponse<List<EnrollmentResponse>> findByCourseId(Long courseId) {
        return null;
    }


}



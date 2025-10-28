package com.elearning.e_hub.module.enrollment.controller;

import com.elearning.e_hub.common.dto.ApiResponse;
import com.elearning.e_hub.module.enrollment.dto.EnrollmentRequest;
import com.elearning.e_hub.module.enrollment.dto.EnrollmentResponse;
import com.elearning.e_hub.module.enrollment.enums.EnrollmentStatus;
import com.elearning.e_hub.module.enrollment.service.EnrollmentService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/enrollments")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<EnrollmentResponse>> create(@Valid @RequestBody EnrollmentRequest request) {
        try {
            EnrollmentResponse response = enrollmentService.enroll(request);
            return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Enrolled successfully", response));
        } catch (Exception ex) {
            log.error("Error while enrolling", ex);
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>("ERROR", ex.getMessage(), null));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EnrollmentResponse>> getById(@PathVariable Long id) {
        try {
            EnrollmentResponse response = enrollmentService.getById(id);
            return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Retrieved successfully", response));
        } catch (Exception ex) {
            log.error("Error while getting enrollment", ex);
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>("ERROR", ex.getMessage(), null));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EnrollmentResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody EnrollmentRequest request) {
        try {
            EnrollmentResponse response = enrollmentService.update(id, request);
            return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Updated successfully", response));
        } catch (Exception ex) {
            log.error("Error while updating enrollment", ex);
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>("ERROR", ex.getMessage(), null));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> cancel(@PathVariable Long id) {
        try {
            enrollmentService.cancel(id);
            return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Cancelled successfully", null));
        } catch (Exception ex) {
            log.error("Error while cancelling enrollment", ex);
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>("ERROR", ex.getMessage(), null));
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<EnrollmentResponse>> changeStatus(
            @PathVariable Long id,
            @RequestParam EnrollmentStatus status) {
        try {
            EnrollmentResponse response = enrollmentService.changeStatus(id, status);
            return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Status changed successfully", response));
        } catch (Exception ex) {
            log.error("Error while changing status", ex);
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>("ERROR", ex.getMessage(), null));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<EnrollmentResponse>>> findByUserId(@PathVariable Long userId) {
        try {
            List<EnrollmentResponse> responses = enrollmentService.findByUserId(userId);
            return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Retrieved successfully", responses));
        } catch (Exception ex) {
            log.error("Error while getting enrollments by user", ex);
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>("ERROR", ex.getMessage(), null));
        }
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<ApiResponse<List<EnrollmentResponse>>> findByCourseId(@PathVariable Long courseId) {
        try {
            List<EnrollmentResponse> responses = enrollmentService.findByCourseId(courseId);
            return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Retrieved successfully", responses));
        } catch (Exception ex) {
            log.error("Error while getting enrollments by course", ex);
            return ResponseEntity.badRequest()
                    .body(new ApiResponse<>("ERROR", ex.getMessage(), null));
        }
    }
}

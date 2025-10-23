package com.elearning.e_hub.module.course.controller;

import com.elearning.e_hub.common.dto.ApiResponse;
import com.elearning.e_hub.module.course.dto.LessonRequest;
import com.elearning.e_hub.module.course.dto.LessonResponse;
import com.elearning.e_hub.module.course.service.LessonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/courses/{courseId}/chapters/{chapterId}/lessons")
@RequiredArgsConstructor
public class LessonController {

    private final LessonService lessonService;
    private static final String SUCCESS = "SUCCESS";

    @GetMapping
    public ResponseEntity<ApiResponse<List<LessonResponse>>> getAllLessons(
            @PathVariable Long courseId,
            @PathVariable Long chapterId) {
        try {
            List<LessonResponse> lessons = lessonService.getLessonsByChapter(courseId, chapterId);
            return ResponseEntity.ok(new ApiResponse<>(SUCCESS, "Danh sách bài học", lessons));
        } catch (Exception e) {
            throw e;
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<LessonResponse>> createLesson(
            @PathVariable Long courseId,
            @PathVariable Long chapterId,
            @Valid @RequestBody LessonRequest request) {
        try {
            LessonResponse lessonResponse = lessonService.createLesson(courseId, chapterId, request);
            return ResponseEntity.ok(new ApiResponse<>(SUCCESS, "Tạo bài học thành công", lessonResponse));
        } catch (Exception e) {
            throw e;
        }
    }

    @GetMapping("/{lessonId}")
    public ResponseEntity<ApiResponse<LessonResponse>> getLessonById(
            @PathVariable Long courseId,
            @PathVariable Long chapterId,
            @PathVariable Long lessonId) {
        try {
            LessonResponse lessonResponse = lessonService.getLessonById(courseId, chapterId, lessonId);
            return ResponseEntity.ok(new ApiResponse<>(SUCCESS, "Chi tiết bài học", lessonResponse));
        } catch (Exception e) {
            throw e;
        }
    }

    @PutMapping("/{lessonId}")
    public ResponseEntity<ApiResponse<LessonResponse>> updateLesson(
            @PathVariable Long courseId,
            @PathVariable Long chapterId,
            @PathVariable Long lessonId,
            @Valid @RequestBody LessonRequest request) {
        try {
            LessonResponse lessonResponse = lessonService.updateLesson(courseId, chapterId, lessonId, request);
            return ResponseEntity.ok(new ApiResponse<>(SUCCESS, "Cập nhật bài học thành công", lessonResponse));
        } catch (Exception e) {
            throw e;
        }
    }

    @DeleteMapping("/{lessonId}")
    public ResponseEntity<ApiResponse<Void>> deleteLesson(
            @PathVariable Long courseId,
            @PathVariable Long chapterId,
            @PathVariable Long lessonId) {
        try {
            lessonService.deleteLesson(courseId, chapterId, lessonId);
            return ResponseEntity.ok(new ApiResponse<>(SUCCESS, "Xóa bài học thành công", null));
        } catch (Exception e) {
            throw e;
        }
    }
}

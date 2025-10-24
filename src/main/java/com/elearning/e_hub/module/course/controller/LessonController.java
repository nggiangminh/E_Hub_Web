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

    @PostMapping
    public ResponseEntity<ApiResponse<LessonResponse>> createLesson(
            @PathVariable Long courseId,
            @PathVariable Long chapterId,
            @Valid @RequestBody LessonRequest request) {
        LessonResponse response = lessonService.createLesson(courseId, chapterId, request);
        return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Tạo bài học thành công", response));
    }

    @GetMapping("/{lessonId}")
    public ResponseEntity<ApiResponse<LessonResponse>> getLesson(
            @PathVariable Long courseId,
            @PathVariable Long chapterId,
            @PathVariable Long lessonId) {
        LessonResponse response = lessonService.getLessonById(courseId, chapterId, lessonId);
        return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Lấy thông tin bài học thành công", response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<LessonResponse>>> getLessonsInChapter(
            @PathVariable Long courseId,
            @PathVariable Long chapterId) {
        List<LessonResponse> responses = lessonService.getLessonsByChapterId(courseId, chapterId);
        return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Lấy danh sách bài học thành công", responses));
    }

    @PutMapping("/{lessonId}")
    public ResponseEntity<ApiResponse<LessonResponse>> updateLesson(
            @PathVariable Long courseId,
            @PathVariable Long chapterId,
            @PathVariable Long lessonId,
            @Valid @RequestBody LessonRequest request) {
        LessonResponse response = lessonService.updateLesson(courseId, chapterId, lessonId, request);
        return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Cập nhật bài học thành công", response));
    }

    @DeleteMapping("/{lessonId}")
    public ResponseEntity<ApiResponse<Void>> deleteLesson(
            @PathVariable Long courseId,
            @PathVariable Long chapterId,
            @PathVariable Long lessonId) {
        lessonService.deleteLesson(courseId, chapterId, lessonId);
        return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Xóa bài học thành công", null));
    }

    @PutMapping("/{lessonId}/publish")
    public ResponseEntity<ApiResponse<LessonResponse>> publishLesson(
            @PathVariable Long courseId,
            @PathVariable Long chapterId,
            @PathVariable Long lessonId) {
        LessonResponse response = lessonService.publishLesson(courseId, chapterId, lessonId);
        return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Xuất bản bài học thành công", response));
    }

    @PutMapping("/{lessonId}/unpublish")
    public ResponseEntity<ApiResponse<LessonResponse>> unpublishLesson(
            @PathVariable Long courseId,
            @PathVariable Long chapterId,
            @PathVariable Long lessonId) {
        LessonResponse response = lessonService.unpublishLesson(courseId, chapterId, lessonId);
        return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Hủy xuất bản bài học thành công", response));
    }
}

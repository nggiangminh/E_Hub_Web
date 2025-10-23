package com.elearning.e_hub.module.course.controller;

import com.elearning.e_hub.common.dto.ApiResponse;
import com.elearning.e_hub.module.course.dto.ChapterRequest;
import com.elearning.e_hub.module.course.dto.ChapterResponse;
import com.elearning.e_hub.module.course.service.ChapterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/courses/{courseId}/chapters")
@RequiredArgsConstructor
public class ChapterController {
    private static final String SUCCESS = "SUCCESS";

    private final ChapterService chapterService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ChapterResponse>>> getAllChapters(
            @PathVariable Long courseId) {
        try {
            List<ChapterResponse> chapters = chapterService.getAllChaptersByCourseId(courseId);
            return ResponseEntity.ok(new ApiResponse<>(SUCCESS, "Danh sách chương", chapters));
        } catch (Exception e) {
            throw e; // Để GlobalExceptionHandler xử lý
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ChapterResponse>> createChapter(
            @PathVariable Long courseId,
            @Valid @RequestBody ChapterRequest request) {
        try {
            ChapterResponse response = chapterService.createChapter(courseId, request);
            return ResponseEntity.ok(new ApiResponse<>(SUCCESS, "Tạo chương thành công", response));
        } catch (Exception e) {
            throw e;
        }
    }

    @GetMapping("/{chapterId}")
    public ResponseEntity<ApiResponse<ChapterResponse>> getChapter(
            @PathVariable Long courseId,
            @PathVariable Long chapterId) {
        try {
            ChapterResponse response = chapterService.getChapterById(courseId, chapterId);
            return ResponseEntity.ok(new ApiResponse<>(SUCCESS, "Chi tiết chương", response));
        } catch (Exception e) {
            throw e;
        }
    }

    @PutMapping("/{chapterId}")
    public ResponseEntity<ApiResponse<ChapterResponse>> updateChapter(
            @PathVariable Long courseId,
            @PathVariable Long chapterId,
            @Valid @RequestBody ChapterRequest request) {
        try {
            ChapterResponse response = chapterService.updateChapter(courseId, chapterId, request);
            return ResponseEntity.ok(new ApiResponse<>(SUCCESS, "Cập nhật chương thành công", response));
        } catch (Exception e) {
            throw e;
        }
    }

    @DeleteMapping("/{chapterId}")
    public ResponseEntity<ApiResponse<Void>> deleteChapter(
            @PathVariable Long courseId,
            @PathVariable Long chapterId) {
        try {
            chapterService.deleteChapter(courseId, chapterId);
            return ResponseEntity.ok(new ApiResponse<>(SUCCESS, "Xóa chương thành công", null));
        } catch (Exception e) {
            throw e;
        }
    }
    }

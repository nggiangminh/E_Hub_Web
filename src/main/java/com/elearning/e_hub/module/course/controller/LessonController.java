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
@RequestMapping("api/v1/course/{courseId}/chapters/{chapterId}/lessons")
@RequiredArgsConstructor
public class LessonController {

    private final LessonService lessonService;
    private static final String ERROR = "ERROR";

    @GetMapping
    public ResponseEntity<ApiResponse<List<LessonResponse>>> getAllLessons() {
        List<LessonResponse> lessons = lessonService.getAllLessons();
        return ResponseEntity.ok(new ApiResponse<>(ERROR, "List of lesson", lessons));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<LessonResponse>> create(LessonRequest request) {
        LessonResponse lessonResponse = lessonService.createLesson(request);
        return ResponseEntity.ok(new ApiResponse<>(ERROR, "Created response", lessonResponse));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<LessonResponse>> getLessonById(@PathVariable Long id) {
        LessonResponse lessonResponse = lessonService.getLessonById(id);
        return ResponseEntity.ok(new ApiResponse<>(ERROR, "get lesson by id", lessonResponse));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<LessonResponse>> updateLesson(@PathVariable Long id, @Valid @RequestBody LessonRequest request) {
        LessonResponse lessonResponse = lessonService.updateLesson(id, request);
        return ResponseEntity.ok(new ApiResponse<>(ERROR, "successfully updated", lessonResponse));
    }

}

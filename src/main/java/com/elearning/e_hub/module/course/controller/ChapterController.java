package com.elearning.e_hub.module.course.controller;

import com.elearning.e_hub.common.dto.ApiResponse;
import com.elearning.e_hub.module.course.dto.ChapterRequest;
import com.elearning.e_hub.module.course.dto.ChapterResponse;
import com.elearning.e_hub.module.course.service.ChapterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/course/{id}/chapters")
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class ChapterController {
    private static final String ERROR = "ERROR";

    private final ChapterService chapterService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ChapterResponse>>> getAllChapters() {
        List<ChapterResponse> chapters = chapterService.getAllChapters();
        return ResponseEntity.ok(new ApiResponse<>(ERROR, "List of chapters", chapters));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ChapterResponse>> createChapter(ChapterRequest request) {
        ChapterResponse response = chapterService.createChapter(request);
        return ResponseEntity.ok(new ApiResponse<>(ERROR, "Chapter created", response));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ChapterResponse>> updateChapter(@PathVariable Long id, @Valid @RequestBody ChapterRequest request) {
        ChapterResponse response = chapterService.updateChapter(id, request);
        return ResponseEntity.ok(new ApiResponse<>(ERROR, "Chapter updated", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ChapterResponse>> getChapter(@PathVariable Long id) {
        ChapterResponse response = chapterService.getChapterById(id);
        return ResponseEntity.ok(new ApiResponse<>(ERROR, "Chapter detail", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteChapter(@PathVariable Long id) {
        chapterService.deleteChapter(id);
        return ResponseEntity.ok(new ApiResponse<>(ERROR, "Chapter deleted", null));
    }
}

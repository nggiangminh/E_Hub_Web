package com.elearning.e_hub.module.course.mapper;

import com.elearning.e_hub.module.course.dto.ChapterRequest;
import com.elearning.e_hub.module.course.dto.ChapterResponse;
import com.elearning.e_hub.module.course.entity.Chapter;

public class ChapterMapper {

    private ChapterMapper() {
        // Prevent instantiation
    }

    public static Chapter toEntity(ChapterRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("CourseRequest cannot be null");
        }

        Chapter chapter = new Chapter();
        updateFromRequest(chapter, request);
        return chapter;
    }

    public static void updateFromRequest(Chapter chapter, ChapterRequest request) {
        if (chapter == null || request == null) {
            throw new IllegalArgumentException("Course and CourseRequest cannot be null");
        }

        try {
            chapter.setTitle(request.title());
            chapter.setDescription(request.description());
        } catch (Exception e) {
            throw new IllegalArgumentException("Error updating course: " + e.getMessage());
        }
    }

    public static ChapterResponse toResponse(Chapter chapter) {
        if (chapter == null) {
            throw new IllegalArgumentException("Course cannot be null");
        }

        return new ChapterResponse(
                chapter.getId(),
                chapter.getTitle(),
                chapter.getDescription(),
                chapter.getOrderIndex(),
                chapter.getCourse().getId(),
                chapter.getCreatedAt(),
                chapter.getUpdatedAt()
        );
    }
}

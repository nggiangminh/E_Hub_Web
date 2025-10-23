package com.elearning.e_hub.module.course.dto;

import com.elearning.e_hub.module.course.enums.LessonType;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public record LessonResponse(
        Long id,
        String title,
        LessonType lessonType,
        String videoUrl,
        String content,
        Integer duration,
        Integer orderIndex,
        Long chapterId,
        Long courseId,

        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        LocalDateTime createdAt,

        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        LocalDateTime updatedAt
) {
    public LessonResponse {
        // Validate và set giá trị mặc định
        if (duration == null) duration = 0;
        if (orderIndex == null) orderIndex = 0;
        if (content == null) content = "";
        if (videoUrl == null) videoUrl = "";
    }
}

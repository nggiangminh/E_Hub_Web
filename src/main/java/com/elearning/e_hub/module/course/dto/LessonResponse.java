package com.elearning.e_hub.module.course.dto;

import com.elearning.e_hub.module.course.entity.Chapter;
import com.elearning.e_hub.module.course.entity.Lesson;
import com.elearning.e_hub.module.course.enums.LessonType;

import java.time.LocalDateTime;

public record LessonResponse(
        Long id,
        String title,
        LessonType lessonType,
        String videoUrl,
        String content,
        Integer duration,
        Chapter chapterId,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public LessonResponse {

    }
}

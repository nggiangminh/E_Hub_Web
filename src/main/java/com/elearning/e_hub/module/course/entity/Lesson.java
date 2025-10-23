package com.elearning.e_hub.module.course.entity;

import com.elearning.e_hub.common.entity.BaseEntity;
import com.elearning.e_hub.module.course.enums.LessonType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lessons", indexes = {
    @Index(name = "idx_lesson_chapter", columnList = "chapter_id"),
    @Index(name = "idx_lesson_order", columnList = "chapter_id, order_index")
})
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Lesson extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Tiêu đề không được để trống")
    @Size(min = 1, max = 100, message = "Tiêu đề phải từ 1-100 ký tự")
    @Column(nullable = false)
    private String title;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LessonType lessonType = LessonType.VIDEO; // Mặc định là video

    @Size(max = 512, message = "URL video không được quá 512 ký tự")
    private String videoUrl;

    @Column(nullable = false)
    private Integer duration = 0; // Thời lượng tính bằng giây

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex = 0;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "chapter_id", nullable = false)
    private Chapter chapter;
}

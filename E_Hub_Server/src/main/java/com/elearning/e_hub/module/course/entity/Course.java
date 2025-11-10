package com.elearning.e_hub.module.course.entity;

import com.elearning.e_hub.common.entity.BaseEntity;
import com.elearning.e_hub.module.course.enums.CourseLevel;
import com.elearning.e_hub.module.course.enums.CourseStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "courses")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Course extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 1, max = 100)
    @NotBlank
    private String title;

    @Size(max = 1000)
    @NotBlank
    private String description;

    @Enumerated(EnumType.STRING)
    private CourseLevel level;

    @Enumerated(EnumType.STRING)
    private CourseStatus status;

    @NotBlank
    private String author;

    @NotNull
    private BigDecimal price;
}

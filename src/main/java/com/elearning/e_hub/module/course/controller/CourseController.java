package com.elearning.e_hub.module.course.controller;

import com.elearning.e_hub.common.dto.ApiResponse;
import com.elearning.e_hub.module.course.dto.CourseRequest;
import com.elearning.e_hub.module.course.dto.CourseResponse;
import com.elearning.e_hub.module.course.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
   import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CourseResponse>>> getAllCourses() {
        List<CourseResponse> courses = courseService.getAllCourses();
        return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Lấy danh sách khóa học thành công", courses));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseResponse>> getCourseById(@PathVariable Long id) {
        CourseResponse course = courseService.getCourseById(id);
        return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Lấy thông tin khóa học thành công", course));
    }

    @PostMapping
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CourseResponse>> createCourse(
            @Valid @RequestBody CourseRequest request
    ) {
        CourseResponse created = courseService.createCourse(request);
        return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Tạo khóa học thành công", created));
    }

    @PutMapping("/{id}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<CourseResponse>> updateCourse(
            @PathVariable Long id,
            @Valid @RequestBody CourseRequest request
    ) {
        CourseResponse updated = courseService.updateCourse(id, request);
        return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Cập nhật khóa học thành công", updated));
    }

    @DeleteMapping("/{id}")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Xóa khóa học thành công", null));
    }
}

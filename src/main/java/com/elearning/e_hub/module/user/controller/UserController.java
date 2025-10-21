package com.elearning.e_hub.module.user.controller;

import com.elearning.e_hub.common.dto.ApiResponse;
import com.elearning.e_hub.module.user.dto.UpdateUserRequest;
import com.elearning.e_hub.module.user.dto.UserDto;
import com.elearning.e_hub.module.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> getCurrentUser() {
        UserDto user = userService.getCurrentUser();
        return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Lấy thông tin người dùng thành công", user));
    }

    @PutMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> updateProfile(@Valid @RequestBody UpdateUserRequest request) {
        UserDto user = userService.getCurrentUser();
        UserDto updatedUser = userService.updateUser(user.id(), request);
        return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Cập nhật thông tin thành công", updatedUser));
    }

    @PutMapping("/me/password")
    public ResponseEntity<ApiResponse<Void>> updatePassword(
            @RequestParam String oldPassword,
            @RequestParam String newPassword
    ) {
        UserDto user = userService.getCurrentUser();
        userService.updatePassword(user.id(), oldPassword, newPassword);
        return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Đổi mật khẩu thành công", null));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Page<UserDto>>> getAllUsers(Pageable pageable) {
        Page<UserDto> users = userService.getAllUsers(pageable);
        return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Lấy danh sách người dùng thành công", users));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserDto>> getUserById(@PathVariable Long id) {
        UserDto user = userService.getUserById(id);
        return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Lấy thông tin người dùng thành công", user));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserDto>> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request
    ) {
        UserDto updatedUser = userService.updateUser(id, request);
        return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Cập nhật thông tin người dùng thành công", updatedUser));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Xóa người dùng thành công", null));
    }
}

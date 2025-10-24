package com.elearning.e_hub.module.user.dto;

import com.elearning.e_hub.common.entity.Role;
import com.elearning.e_hub.common.entity.Status;
import java.time.LocalDateTime;


public record UserDto(
    Long id,

    String fullName,

    String email,

    Role role,

    Status status,

    LocalDateTime lastLoginAt,

    String avatarUrl,

    String bio,

    LocalDateTime createdAt,

    LocalDateTime updatedAt
) {
    public UserDto {
        if (fullName == null || fullName.isBlank()) {
            throw new IllegalArgumentException("Họ tên không được để trống");
        }
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("Email không được để trống");
        }
    }
}

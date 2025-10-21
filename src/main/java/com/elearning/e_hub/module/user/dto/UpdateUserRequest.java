package com.elearning.e_hub.module.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UpdateUserRequest(
    @Size(min = 2, max = 100, message = "Họ tên phải từ 2-100 ký tự")
    String fullName,

    String avatarUrl,

    @Size(max = 500, message = "Bio không được vượt quá 500 ký tự")
    String bio,

    @Email(message = "Invalid email format")
    String email
) {
    public UpdateUserRequest {
        if (fullName == null || fullName.isBlank()) {
            throw new IllegalArgumentException("Họ tên không được để trống");
        }
        if (email != null) {
            email = email.trim().toLowerCase();
        }
    }
}

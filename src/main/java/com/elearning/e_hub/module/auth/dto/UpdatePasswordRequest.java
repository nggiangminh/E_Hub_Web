package com.elearning.e_hub.module.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdatePasswordRequest(@NotBlank(message = "Mật khẩu cũ không được để trống") String oldPassword,

                                    @NotBlank(message = "Mật khẩu mới không được để trống") @Size(min = 8, max = 64, message = "Mật khẩu mới từ 8-64 ký tự") String newPassword) {
}

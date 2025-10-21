package com.elearning.e_hub.module.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record SignupRequest(
        @NotBlank(message = "Email không được để trống") @Email(message = "Email không hợp lệ") String email,

        @NotBlank(message = "Mật khẩu không được để trống") String password,

        @NotBlank(message = "Họ và tên không được để trống") String fullName

) {

}

package com.elearning.e_hub.module.auth.controller;

import com.elearning.e_hub.common.dto.ApiResponse;
import com.elearning.e_hub.common.exception.AppException;
import com.elearning.e_hub.common.exception.ErrorCode;
import com.elearning.e_hub.module.auth.dto.LoginRequest;
import com.elearning.e_hub.module.auth.dto.ResetPasswordRequest;
import com.elearning.e_hub.module.auth.dto.SignupRequest;
import com.elearning.e_hub.module.auth.dto.TokenResponse;
import com.elearning.e_hub.module.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Validated
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<TokenResponse>> login(@Valid @RequestBody LoginRequest request) {
        try {
            TokenResponse token = authService.login(request);
            return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Đăng nhập thành công", token));
        } catch (BadCredentialsException e) {
            throw new AppException(ErrorCode.INVALID_CREDENTIALS, "Email hoặc mật khẩu không đúng");
        } catch (Exception e) {
            log.error("Lỗi đăng nhập: ", e);
            throw new AppException(ErrorCode.INTERNAL_ERROR, "Có lỗi xảy ra khi đăng nhập");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<TokenResponse>> signup(@Valid @RequestBody SignupRequest request) {
        try {
            TokenResponse token = authService.signup(request);
            return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Đăng ký thành công", token));
        } catch (AppException e) {
            throw e;
        } catch (Exception e) {
            log.error("Lỗi đăng ký: ", e);
            throw new AppException(ErrorCode.INTERNAL_ERROR, "Có lỗi xảy ra khi đăng ký");
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<TokenResponse>> refresh(@RequestParam String refreshToken) {
        try {
            TokenResponse token = authService.refreshToken(refreshToken);
            return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Làm mới token thành công", token));
        } catch (AppException e) {
            throw e;
        } catch (Exception e) {
            log.error("Lỗi refresh token: ", e);
            throw new AppException(ErrorCode.INTERNAL_ERROR, "Có lỗi xảy ra khi làm mới token");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(@RequestHeader("Authorization") String token) {
        try {
            authService.logout(token.replace("Bearer ", ""));
            return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Đăng xuất thành công", null));
        } catch (AppException e) {
            throw e;
        } catch (Exception e) {
            log.error("Lỗi đăng xuất: ", e);
            throw new AppException(ErrorCode.INTERNAL_ERROR, "Có lỗi xảy ra khi đăng xuất");
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(@RequestParam String email) {
        try {
            authService.forgotPassword(email);
            return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Email khôi phục mật khẩu đã được gửi", null));
        } catch (AppException e) {
            throw e;
        } catch (Exception e) {
            log.error("Lỗi quên mật khẩu: ", e);
            throw new AppException(ErrorCode.INTERNAL_ERROR, "Có lỗi xảy ra khi gửi email khôi phục");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        try {
            authService.resetPassword(request.token(), request.newPassword());
            return ResponseEntity.ok(new ApiResponse<>("SUCCESS", "Mật khẩu đã được cập nhật thành công", null));
        } catch (AppException e) {
            throw e;
        } catch (Exception e) {
            log.error("Lỗi reset password: ", e);
            throw new AppException(ErrorCode.INTERNAL_ERROR, "Có lỗi xảy ra khi cập nhật mật khẩu");
        }
    }
}

package com.elearning.e_hub.module.auth.service;

import com.elearning.e_hub.module.auth.dto.LoginRequest;
import com.elearning.e_hub.module.auth.dto.SignupRequest;
import com.elearning.e_hub.module.auth.dto.TokenResponse;

public interface AuthService {
    TokenResponse login(LoginRequest request);
    TokenResponse signup(SignupRequest request);
    TokenResponse refreshToken(String refreshToken);
    void logout(String accessToken);
    void forgotPassword(String email);
    void resetPassword(String token, String newPassword);
}

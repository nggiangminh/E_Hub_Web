package com.elearning.e_hub.module.auth.dto;

public record TokenResponse(
    String accessToken,
    String refreshToken,
    long expiresIn
) {}

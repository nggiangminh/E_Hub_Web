package com.elearning.e_hub.module.auth.dto;

import java.time.LocalDateTime;

public record TokenResponse(
        String accessToken,
        String refreshToken,
        LocalDateTime expireAt
) {
}

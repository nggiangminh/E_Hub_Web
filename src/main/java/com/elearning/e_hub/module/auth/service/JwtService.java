package com.elearning.e_hub.module.auth.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    /**
     * Trích xuất username từ JWT token
     *
     * @param token JWT token
     * @return username
     */
    String extractUsername(String token);

    /**
     * Kiểm tra token có hợp lệ không
     *
     * @param token       JWT token
     * @param userDetails thông tin user để so sánh
     * @return true nếu token hợp lệ, false nếu không
     */
    boolean isTokenValid(String token, UserDetails userDetails);

    /**
     * Tạo Authentication object từ JWT token
     *
     * @param token       JWT token
     * @param userDetails thông tin user
     * @param request     HTTP request
     * @return Authentication object
     */
    Authentication getAuthenticationToken(String token, UserDetails userDetails, HttpServletRequest request);
}
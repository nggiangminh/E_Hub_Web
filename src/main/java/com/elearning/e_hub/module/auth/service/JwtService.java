package com.elearning.e_hub.module.auth.service;

import com.elearning.e_hub.module.user.entity.User;
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

    /**
     * Tạo JWT access token cho user
     *
     * @param user     thông tin user
     * @param sessionId id của session
     * @return JWT access token
     */
    String generateToken(User user, Long sessionId);

    /**
     * Tạo JWT refresh token cho user
     *
     * @param user     thông tin user
     * @param sessionId id của session
     * @return JWT refresh token
     */
    String generateRefreshToken(User user, Long sessionId);

    /**
     * Validate refresh token và trả về sessionId
     *
     * @param refreshToken refresh token cần validate
     * @return sessionId nếu token hợp lệ, null nếu không
     */
    String validateRefreshToken(String refreshToken);

    /**
     * Trích xuất sessionId từ JWT token
     *
     * @param token JWT token
     * @return sessionId
     */
    String extractSessionId(String token);

    /**
     * Lấy thời gian hết hạn của access token
     *
     * @return thời gian tính bằng milliseconds
     */
    long getAccessTokenTTL();
}
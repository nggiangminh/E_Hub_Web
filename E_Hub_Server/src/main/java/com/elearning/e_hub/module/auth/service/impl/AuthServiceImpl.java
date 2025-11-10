package com.elearning.e_hub.module.auth.service.impl;

import com.elearning.e_hub.common.exception.AppException;
import com.elearning.e_hub.common.exception.ErrorCode;
import com.elearning.e_hub.module.auth.dto.LoginRequest;
import com.elearning.e_hub.module.auth.dto.SignupRequest;
import com.elearning.e_hub.module.auth.dto.TokenResponse;
import com.elearning.e_hub.module.auth.entity.Session;
import com.elearning.e_hub.module.auth.repository.SessionRepository;
import com.elearning.e_hub.module.auth.service.AuthService;
import com.elearning.e_hub.module.auth.service.EmailService;
import com.elearning.e_hub.module.auth.service.JwtService;
import com.elearning.e_hub.module.user.entity.User;
import com.elearning.e_hub.module.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final RedisTemplate<String, String> redisTemplate;

    private static final Duration PASSWORD_RESET_TTL = Duration.ofMinutes(15);
    private static final String PASSWORD_RESET_PREFIX = "password:reset:";

    @Override
    @Transactional
    public TokenResponse login(LoginRequest request) {
        // Xác thực credentials và ném BadCredentialsException nếu sai
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        // Lấy thông tin user
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND, "Người dùng không tồn tại"));

        // Cập nhật thời gian đăng nhập cuối
        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        // Tạo session mới
        Session session = new Session();
        session.setUser(user);
        session.setToken(UUID.randomUUID().toString());
        session.setIsActive(true); // Đảm bảo set isActive
        session = sessionRepository.save(session);

        // Generate JWT tokens
        String accessToken = jwtService.generateToken(user, session.getId());
        String refreshToken = jwtService.generateRefreshToken(user, session.getId());

        return new TokenResponse(accessToken, refreshToken, jwtService.getAccessTokenTTL());
    }

    @Override
    @Transactional
    public TokenResponse signup(SignupRequest request) {
        // Kiểm tra email tồn tại
        if (userRepository.existsByEmail(request.email())) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS, "Email đã được sử dụng cho tài khoản khác");
        }

        // Tạo user mới
        User user = new User();
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setFullName(request.fullName());
        userRepository.save(user);

        // Tạo session mới
        Session session = new Session();
        session.setUser(user);
        session.setToken(UUID.randomUUID().toString());
        session.setIsActive(true); // Đảm bảo set isActive
        session = sessionRepository.save(session);

        // Generate JWT tokens
        String accessToken = jwtService.generateToken(user, session.getId());
        String refreshToken = jwtService.generateRefreshToken(user, session.getId());

        return new TokenResponse(accessToken, refreshToken, jwtService.getAccessTokenTTL());
    }

    @Override
    @Transactional
    public TokenResponse refreshToken(String refreshToken) {
        // Validate refresh token
        String sessionId = jwtService.validateRefreshToken(refreshToken);
        if (sessionId == null) {
            throw new AppException(ErrorCode.TOKEN_EXPIRED, "Token làm mới không hợp lệ hoặc đã hết hạn");
        }

        // Lấy session và user
        Session session = sessionRepository.findById(Long.parseLong(sessionId))
                .orElseThrow(() -> new AppException(ErrorCode.TOKEN_EXPIRED, "Phiên làm mới không tồn tại"));

        User user = session.getUser();

        // Generate new tokens
        String newAccessToken = jwtService.generateToken(user, Long.valueOf(sessionId));
        String newRefreshToken = jwtService.generateRefreshToken(user, Long.valueOf(sessionId));

        return new TokenResponse(newAccessToken, newRefreshToken, jwtService.getAccessTokenTTL());
    }

    @Override
    @Transactional
    public void logout(String accessToken) {
        String sessionId = jwtService.extractSessionId(accessToken);
        if (sessionId != null) {
            sessionRepository.deleteById(Long.parseLong(sessionId));
        }
    }

    @Override
    public void forgotPassword(String email) {
        try {
            log.info("Bắt đầu xử lý forgot-password cho email: {}", email);

            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.warn("Không tìm thấy user với email: {}", email);
                    return new AppException(ErrorCode.USER_NOT_FOUND, "Không tìm thấy người dùng với email đã cung cấp");
                });
            log.info("Tìm thấy user: {}", user.getEmail());

            // Generate reset token
            String resetToken = UUID.randomUUID().toString();
            log.info("Đã tạo reset token");

            try {
                // Lưu token vào Redis với TTL
                redisTemplate.opsForValue()
                    .set(PASSWORD_RESET_PREFIX + resetToken, user.getEmail(), PASSWORD_RESET_TTL);
                log.info("Đã lưu token vào Redis");
            } catch (Exception e) {
                log.error("Lỗi khi lưu token vào Redis", e);

            }

            try {
                // Gửi email reset password
                emailService.sendPasswordResetEmail(user.getEmail(), resetToken);
                log.info("Đã gửi email khôi phục mật khẩu thành công");
            } catch (Exception e) {
                log.error("Lỗi khi gửi email", e);
                throw new AppException(ErrorCode.INTERNAL_ERROR, "Lỗi khi gửi email khôi phục mật khẩu");
            }
        } catch (Exception e) {
            log.error("Lỗi không xác định trong forgot-password", e);
            if (e instanceof AppException) {
                throw e;
            }
            throw new AppException(ErrorCode.INTERNAL_ERROR, "Có lỗi xảy ra khi xử lý yêu cầu");
        }
    }

    @Override
    @Transactional
    public void resetPassword(String token, String newPassword) {
        // Validate token from Redis
        String email = redisTemplate.opsForValue().get(PASSWORD_RESET_PREFIX + token);
        if (email == null) {
            throw new AppException(ErrorCode.TOKEN_EXPIRED, "Token đặt lại mật khẩu không hợp lệ hoặc đã hết hạn");
        }

        // Update password
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND, "Không tìm thấy người dùng với email đã cung cấp"));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Delete reset token
        redisTemplate.delete(PASSWORD_RESET_PREFIX + token);

        // Invalidate all sessions
        sessionRepository.deleteByUserId(user.getId());
    }
}

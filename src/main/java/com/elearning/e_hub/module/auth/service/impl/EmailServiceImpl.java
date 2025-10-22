package com.elearning.e_hub.module.auth.service.impl;

import com.elearning.e_hub.module.auth.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private static final String FROM_EMAIL = "noreply@elearning.com";
    private static final String RESET_PASSWORD_SUBJECT = "Khôi phục mật khẩu E-Learning";

    @Override
    public void sendPasswordResetEmail(String email, String resetToken) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(FROM_EMAIL);
        message.setTo(email);
        message.setSubject(RESET_PASSWORD_SUBJECT);
        message.setText(buildResetPasswordEmailContent(resetToken));
        mailSender.send(message);
    }

    private String buildResetPasswordEmailContent(String resetToken) {
        return String.format("""
            Xin chào,
            
            Bạn đã yêu cầu khôi phục mật khẩu cho tài khoản E-Learning.
            
            Vui lòng click vào link sau để đặt lại mật khẩu:
            http://localhost:8080/reset-password?token=%s
            
            Link này sẽ hết hạn sau 15 phút.
            
            Nếu bạn không yêu cầu khôi phục mật khẩu, vui lòng bỏ qua email này.
            
            Trân trọng,
            E-Learning Team
            """, resetToken);
    }
}


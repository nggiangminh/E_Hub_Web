package com.elearning.e_hub.module.auth.service;

public interface EmailService {
    void sendPasswordResetEmail(String email, String resetToken);
}

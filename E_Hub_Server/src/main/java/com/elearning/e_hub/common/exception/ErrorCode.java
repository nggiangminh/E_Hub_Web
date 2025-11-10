package com.elearning.e_hub.common.exception;

public enum ErrorCode {
    // Auth errors
    INVALID_CREDENTIALS(401, "auth.invalid_credentials"),
    TOKEN_EXPIRED(401, "auth.token_expired"),
    // User errors
    USER_NOT_FOUND(404, "user.not_found"),
    EMAIL_ALREADY_EXISTS(409, "user.email_exists"),
    // Course errors
    COURSE_NOT_FOUND(404, "course.not_found"),
    UNAUTHORIZED_ACCESS(403, "course.unauthorized"),
    CHAPTER_NOT_FOUND(404, "chapter.not_found"),
    LESSON_NOT_FOUND(404, "lesson.not_found"),
    // Common errors
    INTERNAL_ERROR(500, "common.internal_error");

    private final int status;
    private final String code;

    ErrorCode(int status, String code) {
        this.status = status;
        this.code = code;
    }

    public int getStatus() {
        return status;
    }

    public String getCode() {
        return code;
    }
}


package com.elearning.e_hub.module.user.dto;

import com.elearning.e_hub.common.entity.Status;
import jakarta.persistence.Column;

public class UpdateUserRequest {

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private Status status;
}

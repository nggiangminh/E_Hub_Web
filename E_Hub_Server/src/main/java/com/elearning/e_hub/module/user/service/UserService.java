package com.elearning.e_hub.module.user.service;

import com.elearning.e_hub.module.user.dto.UpdateUserRequest;
import com.elearning.e_hub.module.user.dto.UserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {
    UserDto getUserById(Long id);
    UserDto getUserByEmail(String email);
    Page<UserDto> getAllUsers(Pageable pageable);
    UserDto updateUser(Long id, UpdateUserRequest request);
    void deleteUser(Long id);
    UserDto getCurrentUser();
    void updatePassword(Long id, String oldPassword, String newPassword);
}

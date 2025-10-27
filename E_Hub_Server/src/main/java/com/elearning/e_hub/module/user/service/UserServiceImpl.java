package com.elearning.e_hub.module.user.service;

import com.elearning.e_hub.common.annotation.LogExecution;
import com.elearning.e_hub.common.exception.AppException;
import com.elearning.e_hub.common.exception.ErrorCode;
import com.elearning.e_hub.module.user.dto.UpdateUserRequest;
import com.elearning.e_hub.module.user.dto.UserDto;
import com.elearning.e_hub.module.user.entity.User;
import com.elearning.e_hub.module.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @LogExecution
    public UserDto getUserById(Long id) {
        return userRepository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND, "Không tìm thấy người dùng với ID: %d", id));
    }

    @Override
    @LogExecution
    public UserDto getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(this::mapToDto)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND, "Không tìm thấy người dùng với email: %s", email));
    }

    @Override
    @LogExecution
    public Page<UserDto> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable).map(this::mapToDto);
    }

    @Override
    @Transactional
    @LogExecution
    public UserDto updateUser(Long id, UpdateUserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND, "Không tìm thấy người dùng với ID: %d", id));

        if (request.email() != null && !request.email().equals(user.getEmail())) {
            userRepository.findByEmail(request.email())
                    .ifPresent(u -> {
                        throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS, "Email %s đã được sử dụng", request.email());
                    });
            user.setEmail(request.email());
        }

        user.setFullName(request.fullName());
        user.setAvatarUrl(request.avatarUrl());
        user.setBio(request.bio());

        return mapToDto(userRepository.save(user));
    }

    @Override
    @Transactional
    @LogExecution
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND, "Không tìm thấy người dùng với ID: %d", id));
        userRepository.delete(user);
    }

    @Override
    @LogExecution
    public UserDto getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return getUserByEmail(email);
    }

    @Override
    @Transactional
    @LogExecution
    public void updatePassword(Long id, String oldPassword, String newPassword) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND, "Không tìm thấy người dùng với ID: %d", id));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new AppException(ErrorCode.INVALID_CREDENTIALS, "Mật khẩu cũ không chính xác");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    private UserDto mapToDto(User user) {
        return new UserDto(
            user.getId(),
            user.getFullName(),
            user.getEmail(),
            user.getRole(),
            user.getStatus(),
            user.getLastLoginAt(),
            user.getAvatarUrl(),
            user.getBio(),
            user.getCreatedAt(),
            user.getUpdatedAt()
        );
    }
}

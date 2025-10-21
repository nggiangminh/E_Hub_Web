package com.elearning.e_hub.module.user.controller;

import org.springframework.web.bind.annotation.*;

@RestController("/api/v1/users")
public class UserController {

    @GetMapping("/get")
    public void getAllUsers() {

    }

    @GetMapping("/get/{email}")
    public void getUserByEmail() {

    }

    @GetMapping("/get/{id}")
    public void getUserById() {
    }

    @PostMapping("/create")
    public void createUser() {

    }

    @PutMapping("/update/{id}")
    public void updateUser() {
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser() {
    }
}

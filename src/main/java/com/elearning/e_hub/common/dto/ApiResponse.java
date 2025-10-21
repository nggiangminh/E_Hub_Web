package com.elearning.e_hub.common.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private String result;    // SUCCESS hoặc ERROR
    private String message;   // thông báo
    private T data;
    private String timestamp;// dữ liệu trả về
}


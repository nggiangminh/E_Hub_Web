# E-Hub API Endpoints Documentation

## Tổng quan
Tài liệu này mô tả đầy đủ các API endpoints của hệ thống E-Learning Hub.

Base URL: `/api/v1`

---

## 1. Authentication APIs (`/auth`)

### 1.1 Đăng nhập
- **Method:** `POST`
- **Endpoint:** `/api/v1/auth/login`
- **Description:** Đăng nhập vào hệ thống
- **Request Body:** `LoginRequest`
- **Response:** `ApiResponse<TokenResponse>`

### 1.2 Đăng ký
- **Method:** `POST`
- **Endpoint:** `/api/v1/auth/signup`
- **Description:** Đăng ký tài khoản mới
- **Request Body:** `SignupRequest`
- **Response:** `ApiResponse<TokenResponse>`

### 1.3 Làm mới token
- **Method:** `POST`
- **Endpoint:** `/api/v1/auth/refresh`
- **Description:** Làm mới access token
- **Query Parameters:**
  - `refreshToken` (String): Refresh token
- **Response:** `ApiResponse<TokenResponse>`

### 1.4 Đăng xuất
- **Method:** `POST`
- **Endpoint:** `/api/v1/auth/logout`
- **Description:** Đăng xuất khỏi hệ thống
- **Headers:**
  - `Authorization`: Bearer token
- **Response:** `ApiResponse<Void>`

### 1.5 Quên mật khẩu
- **Method:** `POST`
- **Endpoint:** `/api/v1/auth/forgot-password`
- **Description:** Gửi email khôi phục mật khẩu
- **Query Parameters:**
  - `email` (String): Địa chỉ email
- **Response:** `ApiResponse<Void>`

### 1.6 Đặt lại mật khẩu
- **Method:** `POST`
- **Endpoint:** `/api/v1/auth/reset-password`
- **Description:** Đặt lại mật khẩu với token
- **Request Body:** `ResetPasswordRequest`
- **Response:** `ApiResponse<Void>`

---

## 2. User Management APIs (`/users`)

### 2.1 Lấy thông tin người dùng hiện tại
- **Method:** `GET`
- **Endpoint:** `/api/v1/users/me`
- **Description:** Lấy thông tin profile của người dùng đang đăng nhập
- **Response:** `ApiResponse<UserDto>`

### 2.2 Cập nhật thông tin cá nhân
- **Method:** `PUT`
- **Endpoint:** `/api/v1/users/me`
- **Description:** Cập nhật thông tin profile cá nhân
- **Request Body:** `UpdateUserRequest`
- **Response:** `ApiResponse<UserDto>`

### 2.3 Đổi mật khẩu
- **Method:** `PUT`
- **Endpoint:** `/api/v1/users/me/password`
- **Description:** Đổi mật khẩu của người dùng hiện tại
- **Query Parameters:**
  - `oldPassword` (String): Mật khẩu cũ
  - `newPassword` (String): Mật khẩu mới
- **Response:** `ApiResponse<Void>`

### 2.4 Lấy danh sách tất cả người dùng (Admin)
- **Method:** `GET`
- **Endpoint:** `/api/v1/users`
- **Description:** Lấy danh sách tất cả người dùng với phân trang (chỉ Admin)
- **Authorization:** ADMIN role required
- **Query Parameters:** Pageable
- **Response:** `ApiResponse<Page<UserDto>>`

### 2.5 Lấy thông tin người dùng theo ID (Admin)
- **Method:** `GET`
- **Endpoint:** `/api/v1/users/{id}`
- **Description:** Lấy thông tin chi tiết của một người dùng (chỉ Admin)
- **Authorization:** ADMIN role required
- **Path Parameters:**
  - `id` (Long): ID của người dùng
- **Response:** `ApiResponse<UserDto>`

### 2.6 Cập nhật thông tin người dùng (Admin)
- **Method:** `PUT`
- **Endpoint:** `/api/v1/users/{id}`
- **Description:** Cập nhật thông tin của một người dùng (chỉ Admin)
- **Authorization:** ADMIN role required
- **Path Parameters:**
  - `id` (Long): ID của người dùng
- **Request Body:** `UpdateUserRequest`
- **Response:** `ApiResponse<UserDto>`

### 2.7 Xóa người dùng (Admin)
- **Method:** `DELETE`
- **Endpoint:** `/api/v1/users/{id}`
- **Description:** Xóa một người dùng khỏi hệ thống (chỉ Admin)
- **Authorization:** ADMIN role required
- **Path Parameters:**
  - `id` (Long): ID của người dùng
- **Response:** `ApiResponse<Void>`

---

## 3. Course Management APIs (`/courses`)

### 3.1 Lấy danh sách tất cả khóa học
- **Method:** `GET`
- **Endpoint:** `/api/v1/courses`
- **Description:** Lấy danh sách tất cả khóa học
- **Response:** `ApiResponse<List<CourseResponse>>`

### 3.2 Lấy thông tin khóa học theo ID
- **Method:** `GET`
- **Endpoint:** `/api/v1/courses/{id}`
- **Description:** Lấy thông tin chi tiết của một khóa học
- **Path Parameters:**
  - `id` (Long): ID của khóa học
- **Response:** `ApiResponse<CourseResponse>`

### 3.3 Tạo khóa học mới
- **Method:** `POST`
- **Endpoint:** `/api/v1/courses`
- **Description:** Tạo một khóa học mới
- **Request Body:** `CourseRequest`
- **Response:** `ApiResponse<CourseResponse>`

### 3.4 Cập nhật khóa học
- **Method:** `PUT`
- **Endpoint:** `/api/v1/courses/{id}`
- **Description:** Cập nhật thông tin của một khóa học
- **Path Parameters:**
  - `id` (Long): ID của khóa học
- **Request Body:** `CourseRequest`
- **Response:** `ApiResponse<CourseResponse>`

### 3.5 Xóa khóa học
- **Method:** `DELETE`
- **Endpoint:** `/api/v1/courses/{id}`
- **Description:** Xóa một khóa học
- **Path Parameters:**
  - `id` (Long): ID của khóa học
- **Response:** `ApiResponse<Void>`

### 3.6 Tìm kiếm khóa học
- **Method:** `GET`
- **Endpoint:** `/api/v1/courses/search`
- **Description:** Tìm kiếm khóa học theo từ khóa
- **Query Parameters:**
  - `keyword` (String): Từ khóa tìm kiếm
- **Response:** `ApiResponse<List<CourseResponse>>`

---

## 4. Chapter Management APIs (`/courses/{courseId}/chapters`)

### 4.1 Lấy danh sách chương của khóa học
- **Method:** `GET`
- **Endpoint:** `/api/v1/courses/{courseId}/chapters`
- **Description:** Lấy tất cả chương của một khóa học
- **Path Parameters:**
  - `courseId` (Long): ID của khóa học
- **Response:** `ApiResponse<List<ChapterResponse>>`

### 4.2 Tạo chương mới
- **Method:** `POST`
- **Endpoint:** `/api/v1/courses/{courseId}/chapters`
- **Description:** Tạo chương mới trong khóa học
- **Path Parameters:**
  - `courseId` (Long): ID của khóa học
- **Request Body:** `ChapterRequest`
- **Response:** `ApiResponse<ChapterResponse>`

### 4.3 Lấy thông tin chương theo ID
- **Method:** `GET`
- **Endpoint:** `/api/v1/courses/{courseId}/chapters/{chapterId}`
- **Description:** Lấy thông tin chi tiết của một chương
- **Path Parameters:**
  - `courseId` (Long): ID của khóa học
  - `chapterId` (Long): ID của chương
- **Response:** `ApiResponse<ChapterResponse>`

### 4.4 Cập nhật chương
- **Method:** `PUT`
- **Endpoint:** `/api/v1/courses/{courseId}/chapters/{chapterId}`
- **Description:** Cập nhật thông tin của một chương
- **Path Parameters:**
  - `courseId` (Long): ID của khóa học
  - `chapterId` (Long): ID của chương
- **Request Body:** `ChapterRequest`
- **Response:** `ApiResponse<ChapterResponse>`

### 4.5 Xóa chương
- **Method:** `DELETE`
- **Endpoint:** `/api/v1/courses/{courseId}/chapters/{chapterId}`
- **Description:** Xóa một chương khỏi khóa học
- **Path Parameters:**
  - `courseId` (Long): ID của khóa học
  - `chapterId` (Long): ID của chương
- **Response:** `ApiResponse<Void>`

---

## 5. Lesson Management APIs (`/courses/{courseId}/chapters/{chapterId}/lessons`)

### 5.1 Tạo bài học mới
- **Method:** `POST`
- **Endpoint:** `/api/v1/courses/{courseId}/chapters/{chapterId}/lessons`
- **Description:** Tạo bài học mới trong chương
- **Path Parameters:**
  - `courseId` (Long): ID của khóa học
  - `chapterId` (Long): ID của chương
- **Request Body:** `LessonRequest`
- **Response:** `ApiResponse<LessonResponse>`

### 5.2 Lấy thông tin bài học theo ID
- **Method:** `GET`
- **Endpoint:** `/api/v1/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}`
- **Description:** Lấy thông tin chi tiết của một bài học
- **Path Parameters:**
  - `courseId` (Long): ID của khóa học
  - `chapterId` (Long): ID của chương
  - `lessonId` (Long): ID của bài học
- **Response:** `ApiResponse<LessonResponse>`

### 5.3 Lấy danh sách bài học trong chương
- **Method:** `GET`
- **Endpoint:** `/api/v1/courses/{courseId}/chapters/{chapterId}/lessons`
- **Description:** Lấy tất cả bài học trong một chương
- **Path Parameters:**
  - `courseId` (Long): ID của khóa học
  - `chapterId` (Long): ID của chương
- **Response:** `ApiResponse<List<LessonResponse>>`

### 5.4 Cập nhật bài học
- **Method:** `PUT`
- **Endpoint:** `/api/v1/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}`
- **Description:** Cập nhật thông tin của một bài học
- **Path Parameters:**
  - `courseId` (Long): ID của khóa học
  - `chapterId` (Long): ID của chương
  - `lessonId` (Long): ID của bài học
- **Request Body:** `LessonRequest`
- **Response:** `ApiResponse<LessonResponse>`

### 5.5 Xóa bài học
- **Method:** `DELETE`
- **Endpoint:** `/api/v1/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}`
- **Description:** Xóa một bài học
- **Path Parameters:**
  - `courseId` (Long): ID của khóa học
  - `chapterId` (Long): ID của chương
  - `lessonId` (Long): ID của bài học
- **Response:** `ApiResponse<Void>`

### 5.6 Xuất bản bài học
- **Method:** `PUT`
- **Endpoint:** `/api/v1/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}/publish`
- **Description:** Xuất bản một bài học
- **Path Parameters:**
  - `courseId` (Long): ID của khóa học
  - `chapterId` (Long): ID của chương
  - `lessonId` (Long): ID của bài học
- **Response:** `ApiResponse<LessonResponse>`

### 5.7 Hủy xuất bản bài học
- **Method:** `PUT`
- **Endpoint:** `/api/v1/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}/unpublish`
- **Description:** Hủy xuất bản một bài học
- **Path Parameters:**
  - `courseId` (Long): ID của khóa học
  - `chapterId` (Long): ID của chương
  - `lessonId` (Long): ID của bài học
- **Response:** `ApiResponse<LessonResponse>`

### 5.8 Upload tài nguyên cho bài học
- **Method:** `POST`
- **Endpoint:** `/api/v1/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}/content`
- **Description:** Upload tài nguyên (video, tài liệu) cho bài học
- **Path Parameters:**
  - `courseId` (Long): ID của khóa học
  - `chapterId` (Long): ID của chương
  - `lessonId` (Long): ID của bài học
- **Request Body:** `Set<String>` (danh sách tài nguyên)
- **Response:** `ApiResponse<LessonResponse>`

### 5.9 Lấy tài nguyên của bài học
- **Method:** `GET`
- **Endpoint:** `/api/v1/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}/content`
- **Description:** Lấy tất cả tài nguyên của một bài học
- **Path Parameters:**
  - `courseId` (Long): ID của khóa học
  - `chapterId` (Long): ID của chương
  - `lessonId` (Long): ID của bài học
- **Response:** `ApiResponse<LessonResponse>`

### 5.10 Xóa tài nguyên của bài học
- **Method:** `DELETE`
- **Endpoint:** `/api/v1/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}/content`
- **Description:** Xóa tất cả tài nguyên của một bài học
- **Path Parameters:**
  - `courseId` (Long): ID của khóa học
  - `chapterId` (Long): ID của chương
  - `lessonId` (Long): ID của bài học
- **Response:** `ApiResponse<Void>`

---

## 6. Enrollment Management APIs (`/enrollments`)

### 6.1 Đăng ký khóa học
- **Method:** `POST`
- **Endpoint:** `/api/v1/enrollments`
- **Description:** Đăng ký tham gia một khóa học
- **Request Body:** `EnrollmentRequest`
- **Response:** `ApiResponse<EnrollmentResponse>`

### 6.2 Lấy thông tin đăng ký theo ID
- **Method:** `GET`
- **Endpoint:** `/api/v1/enrollments/{id}`
- **Description:** Lấy thông tin chi tiết của một đăng ký
- **Path Parameters:**
  - `id` (Long): ID của đăng ký
- **Response:** `ApiResponse<EnrollmentResponse>`

### 6.3 Cập nhật thông tin đăng ký
- **Method:** `PUT`
- **Endpoint:** `/api/v1/enrollments/{id}`
- **Description:** Cập nhật thông tin đăng ký
- **Path Parameters:**
  - `id` (Long): ID của đăng ký
- **Request Body:** `EnrollmentRequest`
- **Response:** `ApiResponse<EnrollmentResponse>`

### 6.4 Hủy đăng ký
- **Method:** `DELETE`
- **Endpoint:** `/api/v1/enrollments/{id}`
- **Description:** Hủy đăng ký khóa học
- **Path Parameters:**
  - `id` (Long): ID của đăng ký
- **Response:** `ApiResponse<Void>`

### 6.5 Thay đổi trạng thái đăng ký
- **Method:** `PUT`
- **Endpoint:** `/api/v1/enrollments/{id}/status`
- **Description:** Thay đổi trạng thái của đăng ký
- **Path Parameters:**
  - `id` (Long): ID của đăng ký
- **Query Parameters:**
  - `status` (EnrollmentStatus): Trạng thái mới
- **Response:** `ApiResponse<EnrollmentResponse>`

### 6.6 Lấy danh sách đăng ký theo người dùng
- **Method:** `GET`
- **Endpoint:** `/api/v1/enrollments/user/{userId}`
- **Description:** Lấy tất cả đăng ký của một người dùng
- **Path Parameters:**
  - `userId` (Long): ID của người dùng
- **Response:** `ApiResponse<List<EnrollmentResponse>>`

### 6.7 Lấy danh sách đăng ký theo khóa học
- **Method:** `GET`
- **Endpoint:** `/api/v1/enrollments/course/{courseId}`
- **Description:** Lấy tất cả đăng ký của một khóa học
- **Path Parameters:**
  - `courseId` (Long): ID của khóa học
- **Response:** `ApiResponse<List<EnrollmentResponse>>`

---

## Response Format

Tất cả API đều trả về response theo format chung:

```json
{
  "status": "SUCCESS" | "ERROR",
  "message": "Thông điệp mô tả",
  "data": T | null
}
```

## Authentication & Authorization

- Hầu hết các API yêu cầu Authentication thông qua JWT token
- Một số API yêu cầu quyền ADMIN
- Token được gửi qua header: `Authorization: Bearer <token>`

## Error Handling

Hệ thống sử dụng `GlobalExceptionHandler` để xử lý lỗi tập trung và trả về response thống nhất.

---

**Tổng số API endpoints: 35**

- Authentication: 6 endpoints
- User Management: 7 endpoints  
- Course Management: 6 endpoints
- Chapter Management: 5 endpoints
- Lesson Management: 10 endpoints
- Enrollment Management: 7 endpoints
# E-learning Course Portal - Monolithic Architecture (Simplified Design)

## 📌 Tổng quan dự án

Nền tảng học trực tuyến với kiến trúc **Monolithic đơn giản hóa**, hỗ trợ giảng viên tạo khóa học và học viên theo dõi tiến độ học tập.

**Tech Stack:**
- Spring Boot 3.2.0 + Java 17
- PostgreSQL + Redis
- JWT Authentication
- AWS S3
- Maven

---

## 🏗️ Cấu trúc Project (Đơn giản hóa)

```
elearning-monolith/
├── src/main/java/vn/com/elearning/
│   ├── ElearningApplication.java
│   │
│   ├── config/                           # Cấu hình hệ thống
│   │   ├── SecurityConfig.java           # Spring Security + JWT
│   │   ├── RedisConfig.java              # Redis cache
│   │   ├── S3Config.java                 # AWS S3
│   │   ├── SwaggerConfig.java            # API documentation
│   │   └── CorsConfig.java               # CORS policy
│   │
│   ├── common/                           # Component dùng chung
│   │   ├── entity/
│   │   │   └── BaseEntity.java           # Base class với created_at, updated_at
│   │   ├── dto/
│   │   │   └── ApiResponse.java          # Unified response wrapper
│   │   ├── exception/
│   │   │   ├── AppException.java         # Single exception class
│   │   │   ├── ErrorCode.java            # Error codes enum
│   │   │   └── GlobalExceptionHandler.java
│   │   ├── annotation/
│   │   │   └── LogExecution.java         # Annotation cho logging
│   │   └── aop       /
│   │       └── LoggingAspect.java        # AOP logging implementation
│   │
│   ├── module/                           # Business modules
│   │   │
│   │   ├── auth/                         # Xác thực & phân quyền
│   │   │   ├── controller/
│   │   │   │   └── AuthController.java
│   │   │   ├── service/
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── JwtService.java
│   │   │   │   └── EmailService.java
│   │   │   ├── repository/
│   │   │   │   └── SessionRepository.java
│   │   │   ├── entity/
│   │   │   │   └── Session.java
│   │   │   └── dto/
│   │   │       ├── LoginRequest.java
│   │   │       ├── SignupRequest.java
│   │   │       ├── TokenResponse.java
│   │   │       └── ResetPasswordRequest.java
│   │   │
│   │   ├── user/                         # Quản lý người dùng
│   │   │   ├── controller/
│   │   │   │   └── UserController.java
│   │   │   ├── service/
│   │   │   │   └── UserService.java
│   │   │   ├── repository/
│   │   │   │   └── UserRepository.java
│   │   │   ├── entity/
│   │   │   │   └── User.java
│   │   │   └── dto/
│   │   │       ├── UserDto.java
│   │   │       └── UpdateUserRequest.java
│   │   │
│   │   ├── course/                       # Quản lý khóa học
│   │   │   ├── controller/
│   │   │   │   ├── CourseController.java
│   │   │   │   ├── ChapterController.java
│   │   │   │   └── LessonController.java
│   │   │   ├── service/
│   │   │   │   ├── CourseService.java
│   │   │   │   ├── ChapterService.java
│   │   │   │   └── LessonService.java
│   │   │   ├── repository/
│   │   │   │   ├── CourseRepository.java
│   │   │   │   ├── ChapterRepository.java
│   │   │   │   └── LessonRepository.java
│   │   │   ├── entity/
│   │   │   │   ├── Course.java
│   │   │   │   ├── Chapter.java
│   │   │   │   └── Lesson.java
│   │   │   └── dto/
│   │   │       ├── CourseDto.java
│   │   │       ├── ChapterDto.java
│   │   │       └── LessonDto.java
│   │   │
│   │   ├── enrollment/                   # Ghi danh khóa học
│   │   │   ├── controller/
│   │   │   │   └── EnrollmentController.java
│   │   │   ├── service/
│   │   │   │   └── EnrollmentService.java
│   │   │   ├── repository/
│   │   │   │   └── EnrollmentRepository.java
│   │   │   ├── entity/
│   │   │   │   └── Enrollment.java
│   │   │   └── dto/
│   │   │       └── EnrollmentDto.java
│   │   │
│   │   ├── progress/                     # Tiến độ học tập
│   │   │   ├── controller/
│   │   │   │   └── ProgressController.java
│   │   │   ├── service/
│   │   │   │   └── ProgressService.java
│   │   │   ├── repository/
│   │   │   │   └── ProgressRepository.java
│   │   │   ├── entity/
│   │   │   │   └── LearningProgress.java
│   │   │   └── dto/
│   │   │       └── ProgressDto.java
│   │   │
│   │   ├── payment/                      # Quản lý thanh toán
│   │   │   ├── controller/
│   │   │   │   └── PaymentController.java
│   │   │   ├── service/
│   │   │   │   └── PaymentService.java
│   │   │   ├── repository/
│   │   │   │   └── PaymentRepository.java
│   │   │   ├── entity/
│   │   │   │   └── Payment.java
│   │   │   └── dto/
│   │   │       ├── CreatePaymentRequest.java
│   │   │       ├── PaymentResponse.java
│   │   │       └── PaymentCallbackRequest.java
│   │   │
│   │   └── storage/                      # Quản lý file (S3)
│   │       ├── controller/
│   │       │   └── StorageController.java
│   │       ├── service/
│   │       │   └── S3Service.java
│   │       └── dto/
│   │           └── UploadResponse.java
│   │
│   └── security/                         # Security components
│       ├── JwtAuthenticationFilter.java
│       ├── JwtAuthenticationEntryPoint.java
│       └── UserDetailsServiceImpl.java
│
├── src/main/resources/
│   ├── application.yml
│   ├── application-dev.yml
│   ├── application-prod.yml
│   └── db/migration/                     # Flyway migrations
│       ├── V1__init_users.sql
│       ├── V2__init_courses.sql
│       ├── V3__init_enrollments.sql
│       └── V4__init_progress.sql
│
└── src/test/java/vn/com/elearning/
```

---

## 📦 Dependencies chính

```xml
<dependencies>
    <!-- Spring Boot Starters -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-mail</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-aop</artifactId>
    </dependency>

    <!-- Database -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
    </dependency>

    <!-- JWT -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.11.5</version>
    </dependency>

    <!-- AWS S3 -->
    <dependency>
        <groupId>software.amazon.awssdk</groupId>
        <artifactId>s3</artifactId>
        <version>2.20.0</version>
    </dependency>

    <!-- OpenAPI (Swagger) -->
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        <version>2.2.0</version>
    </dependency>

    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```

---

## 🗄️ Database Schema (Tóm tắt)

### Core Tables

**users**
- Lưu thông tin người dùng (email, password, role, status)
- Roles: USER, ADMIN, SUPER_ADMIN
- Status: ACTIVE, SUSPENDED, DELETED

**sessions**
- Quản lý phiên đăng nhập
- Liên kết với JWT token
- TTL: 7 ngày

**courses**
- Thông tin khóa học (title, description, instructor_id)
- Status: DRAFT, PUBLISHED, ARCHIVED
- Level: BEGINNER, INTERMEDIATE, ADVANCED

**chapters**
- Chương của khóa học
- Quan hệ: course_id → courses(id)
- Có order_index để sắp xếp

**lessons**
- Bài học trong chương
- Types: VIDEO, DOCUMENT, QUIZ, ASSIGNMENT
- Lưu video_url, content, duration

**enrollments**
- Ghi danh khóa học
- Unique constraint: (user_id, course_id)
- Tracking: progress_percentage, completed_at

**learning_progress**
- Tiến độ học từng bài
- Unique constraint: (enrollment_id, lesson_id)
- Tracking: completed, time_spent_seconds

**payments**
- Thông tin thanh toán
- Liên kết với đơn ghi danh (enrollment_id)
- Trạng thái: PENDING, COMPLETED, FAILED

### Indexes chiến lược
- Email, role, status trên users
- Foreign keys trên tất cả relationships
- Composite index cho enrollment lookups
- Unique index cho payments (user_id, course_id)

---

## 🔐 Authentication & Authorization

### Flow xác thực

**1. Đăng ký (Signup)**
```
POST /api/v1/auth/signup
→ Validate email/password
→ Hash password (BCrypt)
→ Create user + session
→ Generate JWT tokens
→ Return TokenResponse
```

**2. Đăng nhập (Login)**
```
POST /api/v1/auth/login
→ Verify credentials
→ Check user status
→ Create session (Redis, TTL 7 days)
→ Generate JWT (access + refresh)
→ Update last_login_at
```

**3. Làm mới token (Refresh)**
```
POST /api/v1/auth/refresh
→ Verify refresh token
→ Check session validity
→ Generate new access token
```

**4. Reset mật khẩu**
```
POST /api/v1/auth/forgot-password
→ Generate reset token (UUID)
→ Store in Redis (TTL 15 min)
→ Send email

POST /api/v1/auth/reset-password
→ Verify token
→ Update password
→ Invalidate all sessions
```

### JWT Structure
```json
{
  "sub": "userId",
  "email": "user@example.com",
  "role": "USER",
  "sessionId": "uuid",
  "iat": 1234567890,
  "exp": 1234571490
}
```

### Security Policy
- Password: Min 8 chars, uppercase, lowercase, number, special char
- BCrypt strength: 12
- Access token TTL: 1 hour
- Refresh token TTL: 7 days
- Rate limiting: 5 login attempts per 15 min

---

## 🔑 Redis Caching Strategy

### Cache Keys Pattern
```
session:{sessionId}                 → Session data (7 days)
user:sessions:{userId}              → Active sessions list
jwt:blacklist:{tokenId}             → Revoked tokens
password:reset:{token}              → Reset requests (15 min)
user:profile:{userId}               → User profile (30 min)
course:{courseId}                   → Course details (1 hour)
course:list:page:{n}                → Course pagination (10 min)
enrollment:user:{userId}            → User enrollments (30 min)
```

### Cache Invalidation
- **Session**: Logout hoặc password change
- **User profile**: Khi update profile
- **Course**: Khi update/delete course
- **Enrollment**: Khi enroll/cancel
- **Payment**: Khi payment status change

---

## 📊 API Endpoints (Tổng quan)

### Authentication
- `POST /api/v1/auth/signup` - Đăng ký
- `POST /api/v1/auth/login` - Đăng nhập
- `POST /api/v1/auth/logout` - Đăng xuất
- `POST /api/v1/auth/refresh` - Refresh token
- `POST /api/v1/auth/forgot-password` - Quên mật khẩu
- `POST /api/v1/auth/reset-password` - Reset mật khẩu

### User Management
- `GET /api/v1/users/me` - Thông tin cá nhân
- `PUT /api/v1/users/me` - Cập nhật profile
- `PUT /api/v1/users/me/password` - Đổi mật khẩu
- `GET /api/v1/users` - Danh sách users (Admin)

### Course Management
- `GET /api/v1/courses` - Danh sách khóa học
- `POST /api/v1/courses` - Tạo khóa học mới (Instructor)
- `GET /api/v1/courses/{courseId}` - Chi tiết khóa học
- `PUT /api/v1/courses/{courseId}` - Cập nhật khóa học
- `DELETE /api/v1/courses/{courseId}` - Xóa khóa học

### Chapter Management 
- `GET /api/v1/courses/{courseId}/chapters` - Danh sách chương trong khóa học
- `POST /api/v1/courses/{courseId}/chapters` - Thêm chương mới
- `GET /api/v1/courses/{courseId}/chapters/{chapterId}` - Chi tiết chương
- `PUT /api/v1/courses/{courseId}/chapters/{chapterId}` - Cập nhật chương
- `DELETE /api/v1/courses/{courseId}/chapters/{chapterId}` - Xóa chương
- `PUT /api/v1/courses/{courseId}/chapters/order` - Sắp xếp thứ tự các chương

### Lesson Management
- `GET /api/v1/courses/{courseId}/chapters/{chapterId}/lessons` - Danh sách bài học trong chương
- `POST /api/v1/courses/{courseId}/chapters/{chapterId}/lessons` - Thêm bài học mới
- `GET /api/v1/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}` - Chi tiết bài học
- `PUT /api/v1/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}` - Cập nhật bài học  
- `DELETE /api/v1/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}` - Xóa bài học
- `PUT /api/v1/courses/{courseId}/chapters/{chapterId}/lessons/order` - Sắp xếp thứ tự các bài học

### Lesson Content
- `POST /api/v1/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}/content` - Upload nội dung bài học (video/document)
- `GET /api/v1/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}/content` - Xem nội dung bài học
- `DELETE /api/v1/courses/{courseId}/chapters/{chapterId}/lessons/{lessonId}/content` - Xóa nội dung bài học

### Enrollment & Progress
- `POST /api/v1/enrollments` - Ghi danh khóa học
- `GET /api/v1/enrollments` - Danh sách khóa học đã đăng ký
- `GET /api/v1/progress/courses/{id}` - Tiến độ khóa học
- `PUT /api/v1/progress/lessons/{id}` - Cập nhật tiến độ bài học
- `POST /api/v1/progress/lessons/{id}/complete` - Hoàn thành bài học

### Payment
- `POST /api/v1/payments` - Tạo đơn thanh toán
- `GET /api/v1/payments` - Danh sách thanh toán
- `GET /api/v1/payments/{id}` - Chi tiết thanh toán
- `POST /api/v1/payments/callback` - Xử lý callback từ cổng thanh toán

### File Storage
- `POST /api/v1/storage/upload` - Upload file lên S3
- `DELETE /api/v1/storage/{key}` - Xóa file

---

## 🎯 Common Components

### 1. BaseEntity
```java
@MappedSuperclass
public abstract class BaseEntity {
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
```

### 2. ApiResponse (Unified Response)
```java
@Data
public class ApiResponse<T> {
    private String status;      // SUCCESS, ERROR
    private String message;
    private T data;
    private String timestamp;
}
```

### 3. AppException (Single Exception)
```java
public class AppException extends RuntimeException {
    private final ErrorCode errorCode;
    private final Object[] args;
}
```

### 4. ErrorCode (Enum)
```java
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
    
    // Payment errors
    PAYMENT_NOT_FOUND(404, "payment.not_found"),
    PAYMENT_FAILED(400, "payment.failed"),
    
    // Common errors
    VALIDATION_ERROR(400, "common.validation_error"),
    INTERNAL_ERROR(500, "common.internal_error");
}
```

### 5. GlobalExceptionHandler
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiResponse<?>> handleAppException(AppException ex);
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<?>> handleValidationException(...);
}
```

### 6. LogExecution (Annotation)
```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface LogExecution {
    String value() default "";
}
```

### 7. LoggingAspect (AOP)
```java
@Aspect
@Component
public class LoggingAspect {
    @Around("@annotation(LogExecution)")
    public Object logExecution(ProceedingJoinPoint joinPoint) {
        // Log method entry/exit, execution time, exceptions
    }
}
```

---

## 🚀 Configuration & Deployment

### Environment Variables
```properties
# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/elearning
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=password

# Redis
SPRING_REDIS_HOST=localhost
SPRING_REDIS_PORT=6379

# JWT
JWT_SECRET=your-256-bit-secret
JWT_ACCESS_TOKEN_EXPIRATION=3600000
JWT_REFRESH_TOKEN_EXPIRATION=604800000

# AWS S3
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_S3_BUCKET_NAME=elearning-files
AWS_S3_REGION=ap-southeast-1

# Email
SPRING_MAIL_HOST=smtp.gmail.com
SPRING_MAIL_USERNAME=noreply@elearning.com
SPRING_MAIL_PASSWORD=app-password
```

### Application Profiles
- **dev**: Development (debug logging, H2 console)
- **prod**: Production (optimized, monitoring enabled)
- **test**: Testing (in-memory database)

### Health Checks
```
GET /actuator/health
GET /actuator/health/db
GET /actuator/health/redis
```

---

## ⚡ Performance & Optimization

### Database
- Connection pooling: HikariCP (default)
- Indexes trên foreign keys và search columns
- Pagination cho list queries
- DTO projection để tránh N+1

### Caching
- Cache-aside pattern
- TTL theo tính chất data
- Cache warming cho critical data
- Batch invalidation

### API
- GZIP compression
- Lazy loading relationships
- Batch processing cho bulk operations
- Rate limiting

---

## 📈 Monitoring & Logging

### Logging Strategy
- **@LogExecution**: Log method execution time
- **SLF4J + Logback**: Structured logging
- Log levels: ERROR (production), DEBUG (development)
- MDC context: userId, requestId, sessionId

### Metrics (Actuator)
- Request/response times
- Error rates
- Active sessions count
- Database connection pool stats
- Cache hit/miss ratio

### Alerts
- Error rate > 5%
- API response > 2s
- Database connection failures
- Redis connection issues
- Memory usage > 80%

---

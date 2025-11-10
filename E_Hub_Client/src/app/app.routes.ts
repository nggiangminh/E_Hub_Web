import { Routes } from '@angular/router';

export const routes: Routes = [
  // Default redirect to login
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  
  // Authentication routes
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then(c => c.LoginComponent),
        title: 'Đăng nhập - E-Learning Hub'
      },
      {
        path: 'signup',
        loadComponent: () => import('./auth/signup/signup.component').then(c => c.SignupComponent),
        title: 'Đăng ký - E-Learning Hub'
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./auth/forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent),
        title: 'Quên mật khẩu - E-Learning Hub'
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./auth/reset-password/reset-password.component').then(c => c.ResetPasswordComponent),
        title: 'Đặt lại mật khẩu - E-Learning Hub'
      }
    ]
  },

  // Home route (placeholder for future implementation)
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
    title: 'Trang chủ - E-Learning Hub'
  },

  // User routes
  {
    path: 'user',
    children: [
      {
        path: 'profile',
        loadComponent: () => import('./user/profile/profile.component').then(c => c.ProfileComponent),
        title: 'Hồ sơ cá nhân - E-Learning Hub'
      },
      {
        path: 'settings',
        loadComponent: () => import('./user/settings/settings.component').then(c => c.SettingsComponent),
        title: 'Cài đặt - E-Learning Hub'
      }
    ]
  },

  // Course routes
  {
    path: 'courses',
    children: [
      {
        path: '',
        loadComponent: () => import('./courses/course-list/course-list.component').then(c => c.CourseListComponent),
        title: 'Danh sách khóa học - E-Learning Hub'
      },
      {
        path: 'new',
        loadComponent: () => import('./courses/course-form/course-form.component').then(c => c.CourseFormComponent),
        title: 'Tạo khóa học mới - E-Learning Hub'
        // TODO: Add authentication guard
        // canActivate: [AuthGuard]
      },
      {
        path: ':id',
        loadComponent: () => import('./courses/course-details/course-details.component').then(c => c.CourseDetailsComponent),
        title: 'Chi tiết khóa học - E-Learning Hub'
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./courses/course-form/course-form.component').then(c => c.CourseFormComponent),
        title: 'Chỉnh sửa khóa học - E-Learning Hub'
        // TODO: Add authentication guard and owner check
        // canActivate: [AuthGuard, CourseOwnerGuard]
      },
      {
        path: ':id/chapters',
        loadComponent: () => import('./courses/chapter-management/chapter-management.component').then(c => c.ChapterManagementComponent),
        title: 'Quản lý chương học - E-Learning Hub'
        // TODO: Add authentication guard and owner check
        // canActivate: [AuthGuard, CourseOwnerGuard]
      },
      {
        path: ':id/lessons/:lessonId',
        loadComponent: () => import('./courses/lesson-viewer/lesson-viewer.component').then(c => c.LessonViewerComponent),
        title: 'Học bài - E-Learning Hub'
        // TODO: Add enrollment check
        // canActivate: [AuthGuard, EnrollmentGuard]
      }
    ]
  },

  // Admin routes
  {
    path: 'admin',
    children: [
      {
        path: 'users',
        loadComponent: () => import('./admin/users/admin-users.component').then(c => c.AdminUsersComponent),
        title: 'Quản lý người dùng - E-Learning Hub'
        // TODO: Add role-based guard for admin access
        // canActivate: [AdminGuard]
      },
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      }
    ]
  },

  // Wildcard route - should be last
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];

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

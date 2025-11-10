import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormsModule } from '@angular/forms';

interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
  autoLogoutMinutes: number;
}

interface PrivacySettings {
  publicProfile: boolean;
  showProgress: boolean;
}

interface ActiveSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class SettingsComponent implements OnInit {
  passwordForm!: FormGroup;
  
  // Password visibility toggles
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  
  // Loading states
  isChangingPassword = false;
  
  // Modal states
  showDeleteConfirm = false;
  show2FAModal = false;
  
  // Form data
  deleteConfirmText = '';
  twoFACode = '';
  backupCode = 'ABCD-EFGH-IJKL-MNOP';
  
  // Settings
  securitySettings: SecuritySettings = {
    twoFactorEnabled: false,
    loginNotifications: true,
    autoLogoutMinutes: 60
  };
  
  privacySettings: PrivacySettings = {
    publicProfile: true,
    showProgress: true
  };
  
  // Active sessions
  activeSessions: ActiveSession[] = [
    {
      id: '1',
      device: '🖥️ Windows PC - Chrome',
      location: 'Hồ Chí Minh, Việt Nam',
      lastActive: '2024-01-15T14:30:00Z',
      isCurrent: true
    },
    {
      id: '2',
      device: '📱 iPhone 15 - Safari',
      location: 'Hà Nội, Việt Nam',
      lastActive: '2024-01-14T09:15:00Z',
      isCurrent: false
    },
    {
      id: '3',
      device: '📱 Android - Chrome Mobile',
      location: 'Đà Nẵng, Việt Nam',
      lastActive: '2024-01-13T16:45:00Z',
      isCurrent: false
    }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializePasswordForm();
  }

  initializePasswordForm(): void {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordValidator
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom password validator
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!password) return null;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
      return null;
    }

    return { pattern: true };
  }

  // Password match validator
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (!newPassword || !confirmPassword) return null;

    return newPassword.value === confirmPassword.value ? null : { mismatch: true };
  }

  get passwordStrength(): number {
    const password = this.passwordForm.get('newPassword')?.value || '';
    let score = 0;

    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[a-z]/.test(password)) score += 25;
    if (/\d/.test(password)) score += 12.5;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 12.5;

    return Math.min(score, 100);
  }

  get passwordStrengthClass(): string {
    const strength = this.passwordStrength;
    if (strength < 50) return 'weak';
    if (strength < 80) return 'medium';
    return 'strong';
  }

  get passwordStrengthText(): string {
    const strength = this.passwordStrength;
    if (strength < 50) return 'Yếu';
    if (strength < 80) return 'Trung bình';
    return 'Mạnh';
  }

  isPasswordFieldInvalid(fieldName: string): boolean {
    const field = this.passwordForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  onChangePassword(): void {
    if (this.passwordForm.valid) {
      this.isChangingPassword = true;

      // Simulate API call
      setTimeout(() => {
        this.isChangingPassword = false;
        alert('Đổi mật khẩu thành công!');
        this.passwordForm.reset();
        
        // TODO: Call actual API
        console.log('Password changed successfully');
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.passwordForm.controls).forEach(key => {
        this.passwordForm.get(key)?.markAsTouched();
      });
    }
  }

  onToggle2FA(): void {
    if (this.securitySettings.twoFactorEnabled) {
      this.show2FAModal = true;
    } else {
      // Disable 2FA
      setTimeout(() => {
        alert('Đã tắt xác thực hai yếu tố!');
        console.log('2FA disabled');
      }, 500);
    }
  }

  confirm2FA(): void {
    if (this.twoFACode.length === 6) {
      this.show2FAModal = false;
      this.twoFACode = '';
      
      // Simulate 2FA setup
      setTimeout(() => {
        alert('Đã kích hoạt xác thực hai yếu tố thành công!');
        console.log('2FA enabled successfully');
      }, 1000);
    }
  }

  terminateSession(sessionId: string): void {
    const sessionIndex = this.activeSessions.findIndex(s => s.id === sessionId);
    if (sessionIndex > -1) {
      this.activeSessions.splice(sessionIndex, 1);
      alert('Đã đăng xuất thiết bị thành công!');
      
      // TODO: Call actual API
      console.log('Session terminated:', sessionId);
    }
  }

  terminateAllSessions(): void {
    // Keep only current session
    this.activeSessions = this.activeSessions.filter(s => s.isCurrent);
    alert('Đã đăng xuất tất cả thiết bị khác!');
    
    // TODO: Call actual API
    console.log('All other sessions terminated');
  }

  deleteAccount(): void {
    this.showDeleteConfirm = false;
    this.deleteConfirmText = '';
    
    // Simulate account deletion
    setTimeout(() => {
      alert('Tài khoản đã được xóa thành công!');
      // TODO: Redirect to login or call actual delete API
      console.log('Account deleted permanently');
    }, 1000);
  }
}
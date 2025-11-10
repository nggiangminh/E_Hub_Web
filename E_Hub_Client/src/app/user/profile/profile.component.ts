import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface UserData {
  id: number;
  fullName: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  status: 'ACTIVE' | 'SUSPENDED' | 'DELETED';
  lastLoginAt: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  profileForm!: FormGroup;
  user: UserData = {
    id: 1,
    fullName: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    role: 'USER',
    status: 'ACTIVE',
    lastLoginAt: '2024-01-15T10:30:00Z',
    avatarUrl: '',
    bio: 'Tôi là một lập trình viên đam mê học hỏi các công nghệ mới và chia sẻ kiến thức với cộng đồng.',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  };

  isLoading = false;
  showDeleteConfirm = false;
  defaultAvatar = 'https://via.placeholder.com/120x120/4ECDC4/000000?text=👤';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      fullName: [this.user.fullName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      email: [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      bio: [this.user.bio || '', [
        Validators.maxLength(500)
      ]]
    });
  }

  get bioLength(): number {
    return this.profileForm.get('bio')?.value?.length || 0;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getRoleDisplay(role: string): string {
    const roleMap: Record<string, string> = {
      'USER': 'Học viên',
      'ADMIN': 'Quản trị viên',
      'SUPER_ADMIN': 'Quản trị cấp cao'
    };
    return roleMap[role] || role;
  }

  getStatusDisplay(status: string): string {
    const statusMap: Record<string, string> = {
      'ACTIVE': 'Hoạt động',
      'SUSPENDED': 'Tạm khóa',
      'DELETED': 'Đã xóa'
    };
    return statusMap[status] || status;
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

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onAvatarSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file hình ảnh!');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Kích thước file không được vượt quá 5MB!');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.user.avatarUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);

      // TODO: Upload to server
      console.log('Uploading avatar:', file.name);
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;

      // Simulate API call
      setTimeout(() => {
        const formValue = this.profileForm.value;
        this.user = {
          ...this.user,
          ...formValue,
          updatedAt: new Date().toISOString()
        };

        this.isLoading = false;
        alert('Cập nhật thông tin thành công!');
        
        // TODO: Call actual API
        console.log('Updated profile:', this.user);
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.profileForm.controls).forEach(key => {
        this.profileForm.get(key)?.markAsTouched();
      });
    }
  }

  resetForm(): void {
    this.initializeForm();
  }

  downloadProfile(): void {
    const profileData = {
      ...this.user,
      roleDisplay: this.getRoleDisplay(this.user.role),
      statusDisplay: this.getStatusDisplay(this.user.status)
    };

    const dataStr = JSON.stringify(profileData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `profile-${this.user.fullName.replace(/\s+/g, '-').toLowerCase()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }

  deleteAccount(): void {
    this.showDeleteConfirm = false;
    
    // Simulate API call
    setTimeout(() => {
      alert('Tài khoản đã được xóa thành công!');
      // TODO: Redirect to login or call actual delete API
      console.log('Account deleted');
    }, 1000);
  }
}
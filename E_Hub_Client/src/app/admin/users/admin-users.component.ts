import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

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
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css'
})
export class AdminUsersComponent implements OnInit {
  
  // Data
  users: UserData[] = [];
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalUsers = 0;
  totalPages = 0;
  
  // Filters
  searchQuery = '';
  selectedRole = '';
  selectedStatus = '';
  
  // Loading states
  isLoading = false;
  isSaving = false;
  
  // Modal states
  showDetailsModal = false;
  showCreateModal = false;
  showEditModal = false;
  showDeleteModal = false;
  
  // Form and selection
  userForm!: FormGroup;
  selectedUser: UserData | null = null;
  userToDelete: UserData | null = null;
  
  // Default avatar
  defaultAvatar = 'https://via.placeholder.com/50x50/4ECDC4/000000?text=👤';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeUserForm();
    this.loadUsers();
  }

  initializeUserForm(): void {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['USER', [Validators.required]],
      status: ['ACTIVE', [Validators.required]],
      bio: ['']
    });
  }

  // Mock data generator
  generateMockUsers(): UserData[] {
    const names = ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Hoàng Văn E', 'Vũ Thị F', 'Đặng Văn G', 'Bùi Thị H'];
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    const roles: Array<'USER' | 'ADMIN' | 'SUPER_ADMIN'> = ['USER', 'USER', 'USER', 'ADMIN', 'USER', 'USER', 'ADMIN', 'SUPER_ADMIN'];
    const statuses: Array<'ACTIVE' | 'SUSPENDED' | 'DELETED'> = ['ACTIVE', 'ACTIVE', 'SUSPENDED', 'ACTIVE', 'ACTIVE', 'DELETED', 'ACTIVE', 'ACTIVE'];
    
    return names.map((name, index) => ({
      id: index + 1,
      fullName: name,
      email: `${name.toLowerCase().replace(/\s+/g, '')}${index + 1}@${domains[index % domains.length]}`,
      role: roles[index],
      status: statuses[index],
      lastLoginAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      avatarUrl: index % 3 === 0 ? `https://via.placeholder.com/50x50/4ECDC4/000000?text=${index + 1}` : '',
      bio: index % 2 === 0 ? `Giới thiệu ngắn gọn về ${name}` : '',
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    }));
  }

  loadUsers(): void {
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      const allUsers = this.generateMockUsers();
      
      // Apply filters
      let filteredUsers = allUsers.filter(user => {
        const matchesSearch = !this.searchQuery || 
          user.fullName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase());
        
        const matchesRole = !this.selectedRole || user.role === this.selectedRole;
        const matchesStatus = !this.selectedStatus || user.status === this.selectedStatus;
        
        return matchesSearch && matchesRole && matchesStatus;
      });
      
      // Pagination
      this.totalUsers = filteredUsers.length;
      this.totalPages = Math.ceil(this.totalUsers / this.pageSize);
      
      const startIndex = (this.currentPage - 1) * this.pageSize;
      this.users = filteredUsers.slice(startIndex, startIndex + this.pageSize);
      
      this.isLoading = false;
    }, 1000);
  }

  // Computed properties
  get activeUsers(): number {
    return this.users.filter(u => u.status === 'ACTIVE').length;
  }

  get suspendedUsers(): number {
    return this.users.filter(u => u.status === 'SUSPENDED').length;
  }

  // Event handlers
  onSearch(): void {
    this.currentPage = 1;
    this.loadUsers();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadUsers();
  }

  // User actions
  viewUser(user: UserData): void {
    this.selectedUser = user;
    this.showDetailsModal = true;
  }

  editUser(user: UserData): void {
    this.selectedUser = user;
    this.userForm.patchValue({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
      bio: user.bio || ''
    });
    this.showEditModal = true;
  }

  confirmDeleteUser(user: UserData): void {
    this.userToDelete = user;
    this.showDeleteModal = true;
  }

  toggleUserStatus(user: UserData): void {
    const newStatus = user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    
    // Simulate API call
    setTimeout(() => {
      user.status = newStatus;
      user.updatedAt = new Date().toISOString();
      
      alert(`Đã ${newStatus === 'ACTIVE' ? 'kích hoạt' : 'tạm khóa'} người dùng ${user.fullName}!`);
      console.log(`User ${user.id} status changed to:`, newStatus);
    }, 500);
  }

  deleteUser(): void {
    if (this.userToDelete) {
      const userName = this.userToDelete.fullName;
      
      // Remove from list
      this.users = this.users.filter(u => u.id !== this.userToDelete!.id);
      this.totalUsers--;
      
      this.showDeleteModal = false;
      this.userToDelete = null;
      
      alert(`Đã xóa người dùng ${userName} thành công!`);
      console.log('User deleted successfully');
    }
  }

  // Form handling
  onSubmitUser(): void {
    if (this.userForm.valid) {
      this.isSaving = true;
      
      // Simulate API call
      setTimeout(() => {
        const formValue = this.userForm.value;
        
        if (this.showCreateModal) {
          // Create new user
          const newUser: UserData = {
            id: Math.max(...this.users.map(u => u.id)) + 1,
            ...formValue,
            lastLoginAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          
          this.users.unshift(newUser);
          this.totalUsers++;
          alert('Tạo người dùng mới thành công!');
        } else if (this.showEditModal && this.selectedUser) {
          // Update existing user
          Object.assign(this.selectedUser, {
            ...formValue,
            updatedAt: new Date().toISOString()
          });
          alert('Cập nhật thông tin người dùng thành công!');
        }
        
        this.closeEditModal();
        this.isSaving = false;
        
        console.log('User form submitted:', formValue);
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.get(key)?.markAsTouched();
      });
    }
  }

  closeEditModal(): void {
    this.showCreateModal = false;
    this.showEditModal = false;
    this.selectedUser = null;
    this.userForm.reset();
    this.initializeUserForm();
  }

  // Utility methods
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

  getRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Vừa xong';
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} ngày trước`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} tuần trước`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} tháng trước`;
  }

  // Form validation helper
  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Pagination
  goToPage(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }

  getPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];
    
    if (this.totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first, last, current and surrounding pages
      pages.push(1);
      
      if (this.currentPage > 3) {
        pages.push('...');
      }
      
      for (let i = Math.max(2, this.currentPage - 1); i <= Math.min(this.totalPages - 1, this.currentPage + 1); i++) {
        pages.push(i);
      }
      
      if (this.currentPage < this.totalPages - 2) {
        pages.push('...');
      }
      
      if (this.totalPages > 1) {
        pages.push(this.totalPages);
      }
    }
    
    return pages;
  }

  // Track by function for performance
  trackByUserId(index: number, user: UserData): number {
    return user.id;
  }

  // Helper method for template calculations
  getEndIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalUsers);
  }

  // Export functionality
  exportUsers(): void {
    const exportData = this.users.map(user => ({
      ID: user.id,
      'Họ và tên': user.fullName,
      Email: user.email,
      'Vai trò': this.getRoleDisplay(user.role),
      'Trạng thái': this.getStatusDisplay(user.status),
      'Đăng nhập cuối': this.formatDate(user.lastLoginAt),
      'Ngày tạo': this.formatDate(user.createdAt)
    }));
    
    const csvContent = [
      Object.keys(exportData[0]).join(','),
      ...exportData.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    alert('Đã xuất danh sách người dùng thành công!');
  }
}
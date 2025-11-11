import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

interface Course {
  id: number;
  title: string;
  instructor: string;
  thumbnail: string;
  category: string;
}

interface EnrollmentHistoryEntry {
  id: number;
  course: Course;
  action: 'ENROLLED' | 'COMPLETED' | 'CANCELLED' | 'PROGRESS_UPDATE';
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  date: Date;
  amount?: number;
  progress?: number;
  description?: string;
}

@Component({
  selector: 'app-enrollment-history',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './enrollment-history.component.html',
  styleUrls: ['./enrollment-history.component.css']
})
export class EnrollmentHistoryComponent implements OnInit {
  historyEntries: EnrollmentHistoryEntry[] = [];
  filteredHistory: EnrollmentHistoryEntry[] = [];
  
  // Filters
  statusFilter = '';
  timeFilter = '';
  categoryFilter = '';
  
  // View mode
  viewMode: 'timeline' | 'grid' = 'timeline';
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  // Stats
  totalEnrollments = 0;

  // Make Math available to template
  Math = Math;

  constructor(
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadHistoryData();
    this.applyFilters();
  }

  loadHistoryData(): void {
    // Mock data - replace with actual API call
    this.historyEntries = this.generateMockHistory();
    this.totalEnrollments = this.historyEntries.filter(entry => entry.action === 'ENROLLED').length;
  }

  generateMockHistory(): EnrollmentHistoryEntry[] {
    const courses: Course[] = [
      {
        id: 1,
        title: 'JavaScript Căn Bản Đến Nâng Cao',
        instructor: 'Nguyễn Văn An',
        thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
        category: 'Lập trình'
      },
      {
        id: 2,
        title: 'React.js - Xây Dựng Ứng Dụng Web Hiện Đại',
        instructor: 'Trần Thị Bình',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
        category: 'Lập trình'
      },
      {
        id: 3,
        title: 'UI/UX Design - Thiết Kế Trải Nghiệm Người Dùng',
        instructor: 'Võ Thị Lan',
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
        category: 'Design'
      },
      {
        id: 4,
        title: 'Digital Marketing Toàn Diện',
        instructor: 'Lê Văn Cường',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
        category: 'Marketing'
      }
    ];

    const history: EnrollmentHistoryEntry[] = [];
    let entryId = 1;

    // Generate mock history for each course
    courses.forEach((course, courseIndex) => {
      const enrollDate = new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000); // Last 6 months
      const status = courseIndex < 2 ? 'ACTIVE' : courseIndex < 3 ? 'COMPLETED' : 'CANCELLED';

      // Initial enrollment
      history.push({
        id: entryId++,
        course,
        action: 'ENROLLED',
        status,
        date: enrollDate,
        amount: 1500000 + Math.random() * 1000000,
        description: 'Đăng ký thành công và thanh toán hoàn tất'
      });

      // Progress updates for active and completed courses
      if (status === 'ACTIVE' || status === 'COMPLETED') {
        const progressUpdates = status === 'COMPLETED' ? 5 : Math.floor(Math.random() * 3) + 1;
        
        for (let i = 1; i <= progressUpdates; i++) {
          const progressDate = new Date(enrollDate.getTime() + i * 7 * 24 * 60 * 60 * 1000);
          const progress = status === 'COMPLETED' && i === progressUpdates ? 100 : Math.min(i * 20 + Math.random() * 20, 95);
          
          history.push({
            id: entryId++,
            course,
            action: 'PROGRESS_UPDATE',
            status,
            date: progressDate,
            progress,
            description: `Cập nhật tiến độ học tập: ${Math.floor(progress)}%`
          });
        }
      }

      // Completion for completed courses
      if (status === 'COMPLETED') {
        const completionDate = new Date(enrollDate.getTime() + 60 * 24 * 60 * 60 * 1000);
        history.push({
          id: entryId++,
          course,
          action: 'COMPLETED',
          status: 'COMPLETED',
          date: completionDate,
          progress: 100,
          description: 'Hoàn thành khóa học và nhận chứng chỉ'
        });
      }

      // Cancellation for cancelled courses
      if (status === 'CANCELLED') {
        const cancelDate = new Date(enrollDate.getTime() + 14 * 24 * 60 * 60 * 1000);
        history.push({
          id: entryId++,
          course,
          action: 'CANCELLED',
          status: 'CANCELLED',
          date: cancelDate,
          description: 'Hủy đăng ký khóa học theo yêu cầu của học viên'
        });
      }
    });

    return history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  applyFilters(): void {
    let filtered = [...this.historyEntries];

    // Status filter
    if (this.statusFilter) {
      filtered = filtered.filter(entry => entry.status === this.statusFilter);
    }

    // Time filter
    if (this.timeFilter) {
      const now = new Date();
      let startDate: Date;

      switch (this.timeFilter) {
        case 'thisMonth':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'lastMonth':
          startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          const endDate = new Date(now.getFullYear(), now.getMonth(), 0);
          filtered = filtered.filter(entry => 
            entry.date >= startDate && entry.date <= endDate
          );
          break;
        case 'thisYear':
          startDate = new Date(now.getFullYear(), 0, 1);
          break;
        case 'lastYear':
          startDate = new Date(now.getFullYear() - 1, 0, 1);
          const endOfLastYear = new Date(now.getFullYear() - 1, 11, 31);
          filtered = filtered.filter(entry => 
            entry.date >= startDate && entry.date <= endOfLastYear
          );
          break;
        default:
          startDate = new Date(0);
      }

      if (this.timeFilter !== 'lastMonth' && this.timeFilter !== 'lastYear') {
        filtered = filtered.filter(entry => entry.date >= startDate);
      }
    }

    // Category filter
    if (this.categoryFilter) {
      filtered = filtered.filter(entry => entry.course.category === this.categoryFilter);
    }

    this.filteredHistory = filtered;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredHistory.length / this.itemsPerPage);
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  setViewMode(mode: 'timeline' | 'grid'): void {
    this.viewMode = mode;
  }

  resetFilters(): void {
    this.statusFilter = '';
    this.timeFilter = '';
    this.categoryFilter = '';
    this.currentPage = 1;
    this.applyFilters();
  }

  // Utility methods
  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'ACTIVE': 'ACTIVE',
      'COMPLETED': 'COMPLETED',
      'CANCELLED': 'CANCELLED'
    };
    return statusMap[status] || status;
  }

  getActionText(action: string): string {
    const actionMap: { [key: string]: string } = {
      'ENROLLED': 'Đăng ký',
      'COMPLETED': 'Hoàn thành',
      'CANCELLED': 'Hủy đăng ký',
      'PROGRESS_UPDATE': 'Cập nhật tiến độ'
    };
    return actionMap[action] || action;
  }

  formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  formatTime(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }

  // Statistics methods
  getActiveCount(): number {
    return this.historyEntries.filter(entry => 
      entry.status === 'ACTIVE' && entry.action === 'ENROLLED'
    ).length;
  }

  getCompletedCount(): number {
    return this.historyEntries.filter(entry => 
      entry.status === 'COMPLETED' && entry.action === 'COMPLETED'
    ).length;
  }

  getCancelledCount(): number {
    return this.historyEntries.filter(entry => 
      entry.status === 'CANCELLED' && entry.action === 'CANCELLED'
    ).length;
  }

  getTotalStudyTime(): number {
    // Mock calculation - in real app, this would come from actual study time data
    return Math.floor(Math.random() * 200 + 100);
  }

  getMonthlyEnrollments(): number {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return this.historyEntries.filter(entry => 
      entry.action === 'ENROLLED' && entry.date >= thisMonth
    ).length;
  }

  getTotalSpent(): number {
    return this.historyEntries
      .filter(entry => entry.action === 'ENROLLED' && entry.amount)
      .reduce((total, entry) => total + (entry.amount || 0), 0);
  }

  getAverageProgress(): number {
    const progressEntries = this.historyEntries
      .filter(entry => entry.progress !== undefined && entry.status === 'ACTIVE')
      .reduce((acc, entry) => {
        const courseId = entry.course.id;
        if (!acc[courseId] || entry.progress! > acc[courseId]) {
          acc[courseId] = entry.progress!;
        }
        return acc;
      }, {} as { [key: number]: number });

    const progresses = Object.values(progressEntries);
    return progresses.length > 0 
      ? Math.round(progresses.reduce((sum, p) => sum + p, 0) / progresses.length)
      : 0;
  }

  getLongestStreak(): number {
    // Mock calculation - in real app, this would calculate actual learning streaks
    return Math.floor(Math.random() * 30 + 5);
  }

  exportHistory(): void {
    const exportData = this.filteredHistory.map(entry => ({
      'Khóa học': entry.course.title,
      'Giảng viên': entry.course.instructor,
      'Danh mục': entry.course.category,
      'Hành động': this.getActionText(entry.action),
      'Trạng thái': this.getStatusText(entry.status),
      'Ngày': this.formatDate(entry.date),
      'Giờ': this.formatTime(entry.date),
      'Số tiền': entry.amount ? this.formatPrice(entry.amount) : '',
      'Tiến độ': entry.progress !== undefined ? `${entry.progress}%` : '',
      'Mô tả': entry.description || ''
    }));

    const csvContent = this.convertToCSV(exportData);
    this.downloadCSV(csvContent, 'enrollment-history.csv');
  }

  private convertToCSV(data: any[]): string {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    for (const row of data) {
      const values = headers.map(header => {
        const val = row[header];
        return `"${val}"`;
      });
      csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
  }

  private downloadCSV(csvContent: string, filename: string): void {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  goBack(): void {
    this.location.back();
  }
}
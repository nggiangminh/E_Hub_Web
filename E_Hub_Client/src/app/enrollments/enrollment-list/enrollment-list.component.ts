import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface EnrollmentStatus {
  ACTIVE: 'ACTIVE';
  COMPLETED: 'COMPLETED';
}

interface Course {
  id: number;
  title: string;
  instructor: string;
  thumbnail: string;
  description: string;
  level: string;
  category: string;
  duration: number;
  totalLessons: number;
}

interface Enrollment {
  id: number;
  course: Course;
  status: 'ACTIVE' | 'COMPLETED';
  enrolledAt: Date;
  lastAccessed?: Date;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  studyTime: number;
  nextLessonId?: number;
  isFavorite: boolean;
}

interface EnrollmentStats {
  active: number;
  completed: number;
  totalProgress: number;
  totalHours: number;
}

@Component({
  selector: 'app-enrollment-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css']
})
export class EnrollmentListComponent implements OnInit {
  enrollments: Enrollment[] = [];
  filteredEnrollments: Enrollment[] = [];
  paginatedEnrollments: Enrollment[] = [];
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 1;

  // Filtering & Search
  searchTerm = '';
  statusFilter = '';
  progressFilter = '';
  sortBy = 'enrolledAt';

  // Stats
  enrollmentStats: EnrollmentStats = {
    active: 0,
    completed: 0,
    totalProgress: 0,
    totalHours: 0
  };

  // UI States
  showQuickActions = false;

  // Make Math available to template
  Math = Math;

  ngOnInit(): void {
    this.loadEnrollments();
    this.calculateStats();
    this.filterEnrollments();
  }

  loadEnrollments(): void {
    // Mock data - replace with actual API call
    this.enrollments = this.generateMockEnrollments();
  }

  generateMockEnrollments(): Enrollment[] {
    const courses: Course[] = [
      {
        id: 1,
        title: 'JavaScript Căn Bản Đến Nâng Cao',
        instructor: 'Nguyễn Văn An',
        thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
        description: 'Học JavaScript từ cơ bản đến nâng cao với các dự án thực tế.',
        level: 'BEGINNER',
        category: 'Lập trình',
        duration: 120,
        totalLessons: 45
      },
      {
        id: 2,
        title: 'React.js - Xây Dựng Ứng Dụng Web Hiện Đại',
        instructor: 'Trần Thị Bình',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
        description: 'Tạo ứng dụng web tương tác với React.js và các thư viện hiện đại.',
        level: 'INTERMEDIATE',
        category: 'Frontend',
        duration: 150,
        totalLessons: 60
      },
      {
        id: 3,
        title: 'Node.js & Express - Backend Development',
        instructor: 'Lê Văn Cường',
        thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
        description: 'Phát triển API và server với Node.js và Express framework.',
        level: 'INTERMEDIATE',
        category: 'Backend',
        duration: 100,
        totalLessons: 40
      },
      {
        id: 4,
        title: 'MongoDB - Cơ Sở Dữ Liệu NoSQL',
        instructor: 'Phạm Thị Dung',
        thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop',
        description: 'Làm chủ MongoDB để quản lý dữ liệu hiệu quả.',
        level: 'BEGINNER',
        category: 'Database',
        duration: 80,
        totalLessons: 30
      },
      {
        id: 5,
        title: 'Python cho Data Science',
        instructor: 'Hoàng Văn Anh',
        thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
        description: 'Phân tích dữ liệu và machine learning với Python.',
        level: 'ADVANCED',
        category: 'Data Science',
        duration: 200,
        totalLessons: 80
      },
      {
        id: 6,
        title: 'UI/UX Design - Thiết Kế Trải Nghiệm Người Dùng',
        instructor: 'Võ Thị Lan',
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
        description: 'Tạo ra những giao diện đẹp và dễ sử dụng.',
        level: 'BEGINNER',
        category: 'Design',
        duration: 90,
        totalLessons: 35
      }
    ];

    return courses.map((course, index) => ({
      id: index + 1,
      course,
      status: index < 4 ? 'ACTIVE' : 'COMPLETED',
      enrolledAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000), // Random date within last 90 days
      lastAccessed: Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : undefined,
      progress: Math.floor(Math.random() * 100),
      completedLessons: Math.floor(course.totalLessons * (Math.random() * 0.8 + 0.1)),
      totalLessons: course.totalLessons,
      studyTime: Math.floor(Math.random() * 50 + 10),
      nextLessonId: index < 4 ? Math.floor(Math.random() * course.totalLessons) + 1 : undefined,
      isFavorite: Math.random() > 0.5
    })) as Enrollment[];
  }

  calculateStats(): void {
    const activeEnrollments = this.enrollments.filter(e => e.status === 'ACTIVE');
    const completedEnrollments = this.enrollments.filter(e => e.status === 'COMPLETED');
    
    this.enrollmentStats = {
      active: activeEnrollments.length,
      completed: completedEnrollments.length,
      totalProgress: Math.round(this.enrollments.reduce((sum, e) => sum + e.progress, 0) / this.enrollments.length),
      totalHours: this.enrollments.reduce((sum, e) => sum + e.studyTime, 0)
    };
  }

  filterEnrollments(): void {
    let filtered = [...this.enrollments];

    // Search filter
    if (this.searchTerm) {
      filtered = filtered.filter(enrollment =>
        enrollment.course.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        enrollment.course.instructor.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        enrollment.course.category.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (this.statusFilter) {
      filtered = filtered.filter(enrollment => enrollment.status === this.statusFilter);
    }

    // Progress filter
    if (this.progressFilter) {
      const [min, max] = this.progressFilter.split('-').map(Number);
      filtered = filtered.filter(enrollment => 
        enrollment.progress >= min && enrollment.progress <= max
      );
    }

    this.filteredEnrollments = filtered;
    this.sortEnrollments();
  }

  sortEnrollments(): void {
    this.filteredEnrollments.sort((a, b) => {
      switch (this.sortBy) {
        case 'enrolledAt':
          return new Date(b.enrolledAt).getTime() - new Date(a.enrolledAt).getTime();
        case 'progress':
          return b.progress - a.progress;
        case 'title':
          return a.course.title.localeCompare(b.course.title);
        case 'lastAccessed':
          const aTime = a.lastAccessed ? new Date(a.lastAccessed).getTime() : 0;
          const bTime = b.lastAccessed ? new Date(b.lastAccessed).getTime() : 0;
          return bTime - aTime;
        default:
          return 0;
      }
    });

    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredEnrollments.length / this.itemsPerPage);
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
    
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEnrollments = this.filteredEnrollments.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
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

  toggleFavorite(enrollment: Enrollment): void {
    enrollment.isFavorite = !enrollment.isFavorite;
    // Here you would typically make an API call to update the favorite status
    console.log(`Toggled favorite for enrollment ${enrollment.id}: ${enrollment.isFavorite}`);
  }

  exportProgress(): void {
    const progressData = this.enrollments.map(enrollment => ({
      courseTitle: enrollment.course.title,
      instructor: enrollment.course.instructor,
      status: enrollment.status,
      progress: enrollment.progress,
      completedLessons: enrollment.completedLessons,
      totalLessons: enrollment.totalLessons,
      studyTime: enrollment.studyTime,
      enrolledAt: enrollment.enrolledAt,
      lastAccessed: enrollment.lastAccessed
    }));

    const csvContent = this.convertToCSV(progressData);
    this.downloadCSV(csvContent, 'enrollment-progress.csv');
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

  resetFilters(): void {
    this.searchTerm = '';
    this.statusFilter = '';
    this.progressFilter = '';
    this.sortBy = 'enrolledAt';
    this.currentPage = 1;
    this.filterEnrollments();
  }

  formatDate(date: Date | string): string {
    if (!date) return 'Chưa có';
    const d = new Date(date);
    return d.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface CourseData {
  id: number;
  title: string;
  description: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  author: string;
  price: number;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent implements OnInit {

  // Data
  courses: CourseData[] = [];
  
  // Search and filters
  searchQuery = '';
  selectedLevel = '';
  selectedStatus = '';
  selectedPriceRange = '';
  sortBy = 'newest';
  
  // Pagination
  currentPage = 1;
  pageSize = 12;
  totalCourses = 0;
  totalPages = 0;
  
  // Loading states
  isLoading = false;
  
  // Modal states
  showEnrollModal = false;
  selectedCourse: CourseData | null = null;
  
  // Default thumbnail
  defaultThumbnail = 'https://via.placeholder.com/350x200/4ECDC4/000000?text=📚';

  constructor() {}

  ngOnInit(): void {
    this.loadCourses();
  }

  // Mock data generator
  generateMockCourses(): CourseData[] {
    const courseTitles = [
      'Lập trình JavaScript cơ bản',
      'Angular Framework nâng cao',
      'Python cho Data Science',
      'React Native - Mobile App',
      'Machine Learning với TensorFlow',
      'DevOps và Docker Container',
      'UI/UX Design hiện đại',
      'Blockchain và Cryptocurrency',
      'Cloud Computing với AWS',
      'Cyber Security cơ bản',
      'NodeJS Backend Development',
      'Vue.js Framework toàn diện'
    ];

    const authors = [
      'Nguyễn Văn Minh', 'Trần Thị Lan', 'Lê Hoàng Nam', 
      'Phạm Thu Hương', 'Đặng Quốc Anh', 'Vũ Thị Mai'
    ];

    const descriptions = [
      'Khóa học này sẽ giúp bạn nắm vững các kiến thức cơ bản và nâng cao, từ lý thuyết đến thực hành.',
      'Học cách xây dựng ứng dụng hoàn chỉnh với các công nghệ hiện đại và best practices.',
      'Khóa học thực hành với nhiều dự án thực tế và case study từ các công ty lớn.',
      'Từ cơ bản đến nâng cao, tất cả trong một khóa học toàn diện và dễ hiểu.',
      'Phát triển kỹ năng chuyên nghiệp với hướng dẫn từ các chuyên gia hàng đầu.',
      'Học theo lộ trình rõ ràng, có mentor hỗ trợ và cộng đồng học tập tích cực.'
    ];

    const levels: Array<'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'> = [
      'BEGINNER', 'INTERMEDIATE', 'ADVANCED'
    ];

    const statuses: Array<'DRAFT' | 'PUBLISHED' | 'ARCHIVED'> = [
      'PUBLISHED', 'PUBLISHED', 'PUBLISHED', 'DRAFT', 'PUBLISHED', 'ARCHIVED'
    ];

    return courseTitles.map((title, index) => ({
      id: index + 1,
      title,
      description: descriptions[index % descriptions.length],
      level: levels[index % levels.length],
      status: statuses[index % statuses.length],
      author: authors[index % authors.length],
      price: index % 4 === 0 ? 0 : Math.floor(Math.random() * 2000000) + 200000,
      thumbnailUrl: index % 3 === 0 ? `https://via.placeholder.com/350x200/4ECDC4/000000?text=${index + 1}` : '',
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    }));
  }

  loadCourses(): void {
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      let allCourses = this.generateMockCourses();
      
      // Apply filters
      allCourses = this.applyFilters(allCourses);
      
      // Apply sorting
      allCourses = this.applySorting(allCourses);
      
      // Pagination
      this.totalCourses = allCourses.length;
      this.totalPages = Math.ceil(this.totalCourses / this.pageSize);
      
      const startIndex = (this.currentPage - 1) * this.pageSize;
      this.courses = allCourses.slice(startIndex, startIndex + this.pageSize);
      
      this.isLoading = false;
    }, 1000);
  }

  applyFilters(courses: CourseData[]): CourseData[] {
    return courses.filter(course => {
      const matchesSearch = !this.searchQuery || 
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesLevel = !this.selectedLevel || course.level === this.selectedLevel;
      const matchesStatus = !this.selectedStatus || course.status === this.selectedStatus;
      
      const matchesPrice = !this.selectedPriceRange || this.checkPriceRange(course.price);
      
      return matchesSearch && matchesLevel && matchesStatus && matchesPrice;
    });
  }

  checkPriceRange(price: number): boolean {
    switch (this.selectedPriceRange) {
      case 'free': return price === 0;
      case '0-500000': return price > 0 && price <= 500000;
      case '500000-1000000': return price > 500000 && price <= 1000000;
      case '1000000+': return price > 1000000;
      default: return true;
    }
  }

  applySorting(courses: CourseData[]): CourseData[] {
    return courses.sort((a, b) => {
      switch (this.sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name-az':
          return a.title.localeCompare(b.title);
        case 'name-za':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }

  // Computed properties
  get publishedCourses(): number {
    return this.courses.filter(c => c.status === 'PUBLISHED').length;
  }

  get freeCourses(): number {
    return this.courses.filter(c => c.price === 0).length;
  }

  // Event handlers
  onSearch(): void {
    this.currentPage = 1;
    this.loadCourses();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadCourses();
  }

  onSortChange(): void {
    this.loadCourses();
  }

  // Course actions
  enrollCourse(course: CourseData): void {
    if (course.status !== 'PUBLISHED') {
      alert('Khóa học này chưa được xuất bản!');
      return;
    }

    this.selectedCourse = course;
    this.showEnrollModal = true;
  }

  confirmEnrollment(): void {
    if (this.selectedCourse) {
      this.showEnrollModal = false;
      
      // Simulate enrollment
      setTimeout(() => {
        alert(`Đã đăng ký thành công khóa học "${this.selectedCourse!.title}"!`);
        console.log('Enrolled in course:', this.selectedCourse);
        this.selectedCourse = null;
      }, 1000);
    }
  }

  // Utility methods
  getLevelDisplay(level: string): string {
    const levelMap: Record<string, string> = {
      'BEGINNER': 'Cơ bản',
      'INTERMEDIATE': 'Trung cấp',
      'ADVANCED': 'Nâng cao'
    };
    return levelMap[level] || level;
  }

  getStatusDisplay(status: string): string {
    const statusMap: Record<string, string> = {
      'DRAFT': 'Nháp',
      'PUBLISHED': 'Xuất bản',
      'ARCHIVED': 'Lưu trữ'
    };
    return statusMap[status] || status;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(price);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }

  truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  // Pagination
  goToPage(page: number): void {
    this.currentPage = page;
    this.loadCourses();
  }

  getPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];
    
    if (this.totalPages <= 7) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
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
  trackByCourseId(index: number, course: CourseData): number {
    return course.id;
  }
}
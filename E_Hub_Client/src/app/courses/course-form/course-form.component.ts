import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Interface for Course Form Data
interface CourseFormData {
  id?: string;
  title: string;
  description: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | '';
  price: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | '';
  author: string;
  thumbnailUrl?: string;
  categories: string[];
  tags: string[];
  prerequisites: string[];
  learningObjectives: string[];
}

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './course-form.html',
  styleUrls: ['./course-form.css']
})
export class CourseFormComponent implements OnInit {
  // Component State
  isLoading = false;
  isSubmitting = false;
  isEditMode = false;
  showSuccessModal = false;
  isDragOver = false;

  // Form Data
  courseData: CourseFormData = {
    title: '',
    description: '',
    level: '',
    price: 0,
    status: 'DRAFT',
    author: '',
    categories: [],
    tags: [],
    prerequisites: [],
    learningObjectives: []
  };

  // Available Options
  availableCategories = [
    'Lập trình',
    'Thiết kế',
    'Marketing',
    'Kinh doanh',
    'Ngoại ngữ',
    'Kỹ năng mềm',
    'Công nghệ thông tin',
    'Khoa học dữ liệu',
    'DevOps',
    'Mobile Development',
    'Web Development',
    'UI/UX Design'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkEditMode();
    this.initializeForm();
  }

  // Check if we're in edit mode
  private checkEditMode(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!courseId && this.route.snapshot.url.some(segment => segment.path === 'edit');
    
    if (this.isEditMode && courseId) {
      this.loadCourseData(courseId);
    }
  }

  // Initialize form with default values
  private initializeForm(): void {
    if (!this.isEditMode) {
      // Set default author from current user (mock)
      this.courseData.author = 'Nguyễn Văn Minh'; // In real app, get from auth service
    }
  }

  // Load existing course data for editing
  private loadCourseData(courseId: string): void {
    this.isLoading = true;
    
    // Mock API call - replace with actual service call
    setTimeout(() => {
      this.courseData = this.generateMockCourseData(courseId);
      this.isLoading = false;
    }, 1000);
  }

  // Generate mock course data for editing
  private generateMockCourseData(courseId: string): CourseFormData {
    return {
      id: courseId,
      title: 'Lập trình Angular từ cơ bản đến nâng cao',
      description: 'Khóa học toàn diện về Angular, bao gồm từ những khái niệm cơ bản như component, service, routing cho đến các chủ đề nâng cao như state management, performance optimization và testing. Phù hợp cho người mới bắt đầu và những developer muốn nâng cao kỹ năng Angular.',
      level: 'INTERMEDIATE',
      price: 1500000,
      status: 'PUBLISHED',
      author: 'Nguyễn Văn Minh',
      thumbnailUrl: '/assets/images/angular-course.jpg',
      categories: ['Lập trình', 'Web Development', 'Công nghệ thông tin'],
      tags: ['angular', 'typescript', 'frontend', 'web development', 'spa'],
      prerequisites: [
        'Kiến thức cơ bản về HTML, CSS, JavaScript',
        'Hiểu biết về TypeScript là một lợi thế',
        'Kinh nghiệm với command line interface'
      ],
      learningObjectives: [
        'Nắm vững các khái niệm cốt lõi của Angular',
        'Xây dựng ứng dụng web SPA hoàn chỉnh',
        'Sử dụng Angular CLI hiệu quả',
        'Implement routing và navigation',
        'Quản lý state và services',
        'Testing và debugging Angular apps'
      ]
    };
  }

  // Form submission
  onSubmit(): void {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    
    // Mock API call
    setTimeout(() => {
      console.log('Submitting course data:', this.courseData);
      this.isSubmitting = false;
      this.showSuccessModal = true;
    }, 2000);
  }

  // Save as draft
  saveDraft(): void {
    if (this.isSubmitting) return;
    
    const originalStatus = this.courseData.status;
    this.courseData.status = 'DRAFT';
    this.isSubmitting = true;
    
    // Mock API call
    setTimeout(() => {
      console.log('Saving as draft:', this.courseData);
      this.isSubmitting = false;
      alert('Đã lưu nháp thành công!');
    }, 1500);
  }

  // Price formatting
  formatPrice(price: number): string {
    if (price === 0) {
      return 'Miễn phí';
    }
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }

  // File upload handling
  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.handleFileUpload(input.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    
    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      this.handleFileUpload(event.dataTransfer.files[0]);
    }
  }

  private handleFileUpload(file: File): void {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file ảnh hợp lệ!');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File ảnh không được vượt quá 5MB!');
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      this.courseData.thumbnailUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);

    // In real app, upload to server here
    console.log('Uploading file:', file.name);
  }

  removeThumbnail(): void {
    this.courseData.thumbnailUrl = undefined;
  }

  // Categories management
  toggleCategory(category: string): void {
    const index = this.courseData.categories.indexOf(category);
    if (index > -1) {
      this.courseData.categories.splice(index, 1);
    } else {
      this.courseData.categories.push(category);
    }
  }

  // Tags management
  addTag(event: Event): void {
    const input = event.target as HTMLInputElement;
    const tag = input.value.trim();
    
    if (tag && !this.courseData.tags.includes(tag)) {
      this.courseData.tags.push(tag);
      input.value = '';
    }
    
    event.preventDefault();
  }

  removeTag(index: number): void {
    this.courseData.tags.splice(index, 1);
  }

  // Prerequisites management
  addPrerequisite(input: HTMLInputElement): void {
    const prerequisite = input.value.trim();
    
    if (prerequisite && !this.courseData.prerequisites.includes(prerequisite)) {
      this.courseData.prerequisites.push(prerequisite);
      input.value = '';
    }
  }

  removePrerequisite(index: number): void {
    this.courseData.prerequisites.splice(index, 1);
  }

  // Learning objectives management
  addLearningObjective(input: HTMLInputElement): void {
    const objective = input.value.trim();
    
    if (objective && !this.courseData.learningObjectives.includes(objective)) {
      this.courseData.learningObjectives.push(objective);
      input.value = '';
    }
  }

  removeLearningObjective(index: number): void {
    this.courseData.learningObjectives.splice(index, 1);
  }

  // Navigation after success
  navigateToCourse(): void {
    if (this.courseData.id) {
      this.router.navigate(['/courses', this.courseData.id]);
    } else {
      // In real app, get the created course ID from API response
      this.router.navigate(['/courses']);
    }
  }
}
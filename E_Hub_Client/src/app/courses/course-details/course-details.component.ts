import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Interfaces for Course Data
interface CourseData {
  id: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  author: string;
  price: number;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
}

interface ChapterData {
  id: string;
  courseId: string;
  title: string;
  description: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

interface LessonData {
  id: string;
  chapterId: string;
  title: string;
  description?: string;
  lessonType: 'VIDEO' | 'DOCUMENT' | 'QUIZ';
  contentUrl?: string;
  durationSeconds?: number;
  orderIndex: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  contentPreview?: string;
}

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './course-details.html',
  styleUrls: ['./course-details.css']
})
export class CourseDetailsComponent implements OnInit {
  // Component State
  isLoading = false;
  course: CourseData | null = null;
  chapters: ChapterData[] = [];
  lessons: LessonData[] = [];
  expandedChapters = new Set<string>();
  allExpanded = false;
  isEnrolled = false;

  // Modal States
  showPreviewModal = false;
  showShareModal = false;
  selectedLesson: LessonData | null = null;

  // Default thumbnail
  defaultThumbnail = '/assets/images/course-default.jpg';

  // Share URL
  shareUrl = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourseDetails();
    this.generateShareUrl();
  }

  // Load course data and related content
  private loadCourseDetails(): void {
    this.isLoading = true;
    
    const courseId = this.route.snapshot.paramMap.get('id');
    if (!courseId) {
      this.router.navigate(['/courses']);
      return;
    }

    // Simulate API calls with mock data
    setTimeout(() => {
      this.course = this.generateMockCourse(courseId);
      this.chapters = this.generateMockChapters(courseId);
      this.lessons = this.generateMockLessons();
      this.checkEnrollmentStatus();
      this.isLoading = false;
    }, 1000);
  }

  // Generate mock course data
  private generateMockCourse(courseId: string): CourseData {
    const courses = [
      {
        id: courseId,
        title: 'Lập trình Angular từ cơ bản đến nâng cao',
        description: 'Khóa học toàn diện về Angular, bao gồm từ những khái niệm cơ bản như component, service, routing cho đến các chủ đề nâng cao như state management, performance optimization và testing. Phù hợp cho người mới bắt đầu và những developer muốn nâng cao kỹ năng Angular.',
        thumbnailUrl: '/assets/images/angular-course.jpg',
        author: 'Nguyễn Văn Minh',
        price: 1500000,
        level: 'INTERMEDIATE' as const,
        status: 'PUBLISHED' as const,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-20T14:30:00Z'
      }
    ];

    return courses[0];
  }

  // Generate mock chapters
  private generateMockChapters(courseId: string): ChapterData[] {
    return [
      {
        id: 'chapter-1',
        courseId: courseId,
        title: 'Giới thiệu và cài đặt môi trường',
        description: 'Tìm hiểu về Angular và cách thiết lập môi trường phát triển',
        orderIndex: 1,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
      },
      {
        id: 'chapter-2',
        courseId: courseId,
        title: 'Component và Template',
        description: 'Học về component, template syntax và data binding trong Angular',
        orderIndex: 2,
        createdAt: '2024-01-15T11:00:00Z',
        updatedAt: '2024-01-15T11:00:00Z'
      },
      {
        id: 'chapter-3',
        courseId: courseId,
        title: 'Services và Dependency Injection',
        description: 'Tìm hiểu về services, dependency injection và quản lý state',
        orderIndex: 3,
        createdAt: '2024-01-15T12:00:00Z',
        updatedAt: '2024-01-15T12:00:00Z'
      },
      {
        id: 'chapter-4',
        courseId: courseId,
        title: 'Routing và Navigation',
        description: 'Học cách sử dụng Angular Router để tạo ứng dụng SPA',
        orderIndex: 4,
        createdAt: '2024-01-15T13:00:00Z',
        updatedAt: '2024-01-15T13:00:00Z'
      },
      {
        id: 'chapter-5',
        courseId: courseId,
        title: 'Forms và Validation',
        description: 'Xây dựng forms với template-driven và reactive forms',
        orderIndex: 5,
        createdAt: '2024-01-15T14:00:00Z',
        updatedAt: '2024-01-15T14:00:00Z'
      }
    ];
  }

  // Generate mock lessons
  private generateMockLessons(): LessonData[] {
    return [
      // Chapter 1 lessons
      {
        id: 'lesson-1-1',
        chapterId: 'chapter-1',
        title: 'Angular là gì?',
        description: 'Giới thiệu về Angular framework và lịch sử phát triển',
        lessonType: 'VIDEO',
        contentUrl: '/assets/videos/intro-angular.mp4',
        durationSeconds: 900,
        orderIndex: 1,
        published: true,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        contentPreview: 'Angular là một framework phát triển ứng dụng web hiện đại...'
      },
      {
        id: 'lesson-1-2',
        chapterId: 'chapter-1',
        title: 'Cài đặt Node.js và Angular CLI',
        description: 'Hướng dẫn cài đặt môi trường phát triển Angular',
        lessonType: 'VIDEO',
        contentUrl: '/assets/videos/setup-environment.mp4',
        durationSeconds: 1200,
        orderIndex: 2,
        published: true,
        createdAt: '2024-01-15T10:15:00Z',
        updatedAt: '2024-01-15T10:15:00Z',
        contentPreview: 'Trong bài này chúng ta sẽ cài đặt Node.js và Angular CLI...'
      },
      {
        id: 'lesson-1-3',
        chapterId: 'chapter-1',
        title: 'Tạo ứng dụng Angular đầu tiên',
        description: 'Tạo và chạy ứng dụng Angular đơn giản',
        lessonType: 'VIDEO',
        contentUrl: '/assets/videos/first-app.mp4',
        durationSeconds: 1500,
        orderIndex: 3,
        published: true,
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
        contentPreview: 'Sử dụng ng new để tạo ứng dụng Angular mới...'
      },

      // Chapter 2 lessons
      {
        id: 'lesson-2-1',
        chapterId: 'chapter-2',
        title: 'Tạo Component',
        description: 'Học cách tạo và sử dụng component trong Angular',
        lessonType: 'VIDEO',
        contentUrl: '/assets/videos/create-component.mp4',
        durationSeconds: 1800,
        orderIndex: 1,
        published: true,
        createdAt: '2024-01-15T11:00:00Z',
        updatedAt: '2024-01-15T11:00:00Z',
        contentPreview: 'Component là building block cơ bản của Angular...'
      },
      {
        id: 'lesson-2-2',
        chapterId: 'chapter-2',
        title: 'Template Syntax',
        description: 'Tìm hiểu về template syntax và data binding',
        lessonType: 'VIDEO',
        contentUrl: '/assets/videos/template-syntax.mp4',
        durationSeconds: 2100,
        orderIndex: 2,
        published: true,
        createdAt: '2024-01-15T11:20:00Z',
        updatedAt: '2024-01-15T11:20:00Z',
        contentPreview: 'Angular template syntax cho phép chúng ta bind data...'
      },
      {
        id: 'lesson-2-3',
        chapterId: 'chapter-2',
        title: 'Event Handling',
        description: 'Xử lý events trong Angular component',
        lessonType: 'VIDEO',
        contentUrl: '/assets/videos/event-handling.mp4',
        durationSeconds: 1600,
        orderIndex: 3,
        published: true,
        createdAt: '2024-01-15T11:40:00Z',
        updatedAt: '2024-01-15T11:40:00Z',
        contentPreview: 'Sử dụng event binding để xử lý user interactions...'
      },

      // Chapter 3 lessons
      {
        id: 'lesson-3-1',
        chapterId: 'chapter-3',
        title: 'Tạo Service',
        description: 'Học cách tạo và inject service trong Angular',
        lessonType: 'VIDEO',
        contentUrl: '/assets/videos/create-service.mp4',
        durationSeconds: 1900,
        orderIndex: 1,
        published: true,
        createdAt: '2024-01-15T12:00:00Z',
        updatedAt: '2024-01-15T12:00:00Z',
        contentPreview: 'Service được sử dụng để chia sẻ logic và data...'
      },
      {
        id: 'lesson-3-2',
        chapterId: 'chapter-3',
        title: 'Dependency Injection',
        description: 'Hiểu về dependency injection pattern trong Angular',
        lessonType: 'DOCUMENT',
        contentUrl: '/assets/docs/dependency-injection.pdf',
        durationSeconds: 0,
        orderIndex: 2,
        published: true,
        createdAt: '2024-01-15T12:20:00Z',
        updatedAt: '2024-01-15T12:20:00Z',
        contentPreview: 'Dependency Injection là một design pattern quan trọng...'
      },

      // Chapter 4 lessons
      {
        id: 'lesson-4-1',
        chapterId: 'chapter-4',
        title: 'Cấu hình Router',
        description: 'Thiết lập routing cơ bản trong Angular',
        lessonType: 'VIDEO',
        contentUrl: '/assets/videos/setup-router.mp4',
        durationSeconds: 2000,
        orderIndex: 1,
        published: true,
        createdAt: '2024-01-15T13:00:00Z',
        updatedAt: '2024-01-15T13:00:00Z',
        contentPreview: 'Angular Router giúp tạo navigation trong SPA...'
      },
      {
        id: 'lesson-4-2',
        chapterId: 'chapter-4',
        title: 'Route Parameters',
        description: 'Sử dụng route parameters và query parameters',
        lessonType: 'VIDEO',
        contentUrl: '/assets/videos/route-params.mp4',
        durationSeconds: 1700,
        orderIndex: 2,
        published: false,
        createdAt: '2024-01-15T13:30:00Z',
        updatedAt: '2024-01-15T13:30:00Z',
        contentPreview: 'Route parameters cho phép truyền data qua URL...'
      },

      // Chapter 5 lessons
      {
        id: 'lesson-5-1',
        chapterId: 'chapter-5',
        title: 'Template-driven Forms',
        description: 'Tạo forms sử dụng template-driven approach',
        lessonType: 'VIDEO',
        contentUrl: '/assets/videos/template-forms.mp4',
        durationSeconds: 2200,
        orderIndex: 1,
        published: true,
        createdAt: '2024-01-15T14:00:00Z',
        updatedAt: '2024-01-15T14:00:00Z',
        contentPreview: 'Template-driven forms sử dụng ngModel directive...'
      },
      {
        id: 'lesson-5-2',
        chapterId: 'chapter-5',
        title: 'Reactive Forms',
        description: 'Xây dựng forms với reactive approach',
        lessonType: 'VIDEO',
        contentUrl: '/assets/videos/reactive-forms.mp4',
        durationSeconds: 2400,
        orderIndex: 2,
        published: false,
        createdAt: '2024-01-15T14:30:00Z',
        updatedAt: '2024-01-15T14:30:00Z',
        contentPreview: 'Reactive forms cung cấp control tốt hơn cho validation...'
      }
    ];
  }

  // Check if user is enrolled
  private checkEnrollmentStatus(): void {
    // Mock enrollment check
    this.isEnrolled = Math.random() > 0.5;
  }

  // Generate share URL
  private generateShareUrl(): void {
    this.shareUrl = `${window.location.origin}/courses/${this.route.snapshot.paramMap.get('id')}`;
  }

  // Display helpers
  getStatusDisplay(status: string): string {
    const statusMap = {
      'DRAFT': 'Nháp',
      'PUBLISHED': 'Đã xuất bản',
      'ARCHIVED': 'Lưu trữ'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  }

  getLevelDisplay(level: string): string {
    const levelMap = {
      'BEGINNER': 'Cơ bản',
      'INTERMEDIATE': 'Trung bình',
      'ADVANCED': 'Nâng cao'
    };
    return levelMap[level as keyof typeof levelMap] || level;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  // Computed properties
  get totalLessons(): number {
    return this.lessons.length;
  }

  get totalDuration(): number {
    return this.lessons.reduce((total, lesson) => total + (lesson.durationSeconds || 0), 0);
  }

  get publishedLessons(): number {
    return this.lessons.filter(lesson => lesson.published).length;
  }

  // Chapter management
  toggleChapter(chapterId: string): void {
    if (this.expandedChapters.has(chapterId)) {
      this.expandedChapters.delete(chapterId);
    } else {
      this.expandedChapters.add(chapterId);
    }
    this.updateAllExpandedState();
  }

  isChapterExpanded(chapterId: string): boolean {
    return this.expandedChapters.has(chapterId);
  }

  expandAllChapters(): void {
    if (this.allExpanded) {
      this.expandedChapters.clear();
    } else {
      this.chapters.forEach(chapter => this.expandedChapters.add(chapter.id));
    }
    this.updateAllExpandedState();
  }

  private updateAllExpandedState(): void {
    this.allExpanded = this.expandedChapters.size === this.chapters.length;
  }

  // Lesson helpers
  getChapterLessons(chapterId: string): LessonData[] {
    return this.lessons
      .filter(lesson => lesson.chapterId === chapterId)
      .sort((a, b) => a.orderIndex - b.orderIndex);
  }

  getLessonCount(chapterId: string): number {
    return this.getChapterLessons(chapterId).length;
  }

  getChapterDuration(chapterId: string): string {
    const lessons = this.getChapterLessons(chapterId);
    const totalSeconds = lessons.reduce((total, lesson) => total + (lesson.durationSeconds || 0), 0);
    return this.formatDuration(totalSeconds);
  }

  getLessonTypeIcon(lessonType: string): string {
    const iconMap = {
      'VIDEO': '🎥',
      'DOCUMENT': '📄',
      'QUIZ': '❓'
    };
    return iconMap[lessonType as keyof typeof iconMap] || '📄';
  }

  getLessonTypeDisplay(lessonType: string): string {
    const typeMap = {
      'VIDEO': 'Video',
      'DOCUMENT': 'Tài liệu',
      'QUIZ': 'Bài tập'
    };
    return typeMap[lessonType as keyof typeof typeMap] || lessonType;
  }

  // Actions
  enrollCourse(): void {
    if (this.isEnrolled || !this.course || this.course.status !== 'PUBLISHED') {
      return;
    }

    // Mock enrollment
    console.log('Enrolling in course:', this.course.id);
    this.isEnrolled = true;
    
    // Show success message (in real app, use notification service)
    alert('Đã đăng ký khóa học thành công!');
  }

  previewLesson(lesson: LessonData): void {
    this.selectedLesson = lesson;
    this.showPreviewModal = true;
  }

  shareCourse(): void {
    this.showShareModal = true;
  }

  // Share actions
  copyShareUrl(input: HTMLInputElement): void {
    input.select();
    document.execCommand('copy');
    alert('Đã sao chép liên kết!');
  }

  shareOnFacebook(): void {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  }

  shareOnTwitter(): void {
    const text = `Khóa học hay: ${this.course?.title}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(this.shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  }

  shareOnLinkedIn(): void {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(this.shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  }

  // TrackBy functions for performance
  trackByChapterId(index: number, chapter: ChapterData): string {
    return chapter.id;
  }

  trackByLessonId(index: number, lesson: LessonData): string {
    return lesson.id;
  }
}
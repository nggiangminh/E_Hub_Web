import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Interfaces
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
}

interface ChapterFormData {
  title: string;
  description: string;
  orderIndex?: number;
}

@Component({
  selector: 'app-chapter-management',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './chapter-management.html',
  styleUrls: ['./chapter-management.css']
})
export class ChapterManagementComponent implements OnInit {
  // Component State
  isLoading = false;
  isSubmitting = false;
  reorderMode = false;
  
  // Course Data
  courseId: string = '';
  courseTitle: string = '';
  chapters: ChapterData[] = [];
  lessons: LessonData[] = [];
  expandedChapters = new Set<string>();

  // Modal States
  showChapterModal = false;
  showDeleteModal = false;
  editingChapter: ChapterData | null = null;
  chapterToDelete: ChapterData | null = null;

  // Form Data
  chapterFormData: ChapterFormData = {
    title: '',
    description: '',
    orderIndex: undefined
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  // Load course and chapter data
  private loadData(): void {
    this.isLoading = true;
    
    const courseId = this.route.snapshot.paramMap.get('id');
    if (!courseId) {
      this.router.navigate(['/courses']);
      return;
    }

    this.courseId = courseId;
    
    // Mock API calls
    setTimeout(() => {
      this.courseTitle = 'Lập trình Angular từ cơ bản đến nâng cao';
      this.chapters = this.generateMockChapters();
      this.lessons = this.generateMockLessons();
      this.isLoading = false;
    }, 1000);
  }

  // Generate mock chapters
  private generateMockChapters(): ChapterData[] {
    return [
      {
        id: 'chapter-1',
        courseId: this.courseId,
        title: 'Giới thiệu và cài đặt môi trường',
        description: 'Tìm hiểu về Angular và cách thiết lập môi trường phát triển',
        orderIndex: 1,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
      },
      {
        id: 'chapter-2',
        courseId: this.courseId,
        title: 'Component và Template',
        description: 'Học về component, template syntax và data binding trong Angular',
        orderIndex: 2,
        createdAt: '2024-01-15T11:00:00Z',
        updatedAt: '2024-01-15T11:00:00Z'
      },
      {
        id: 'chapter-3',
        courseId: this.courseId,
        title: 'Services và Dependency Injection',
        description: 'Tìm hiểu về services, dependency injection và quản lý state',
        orderIndex: 3,
        createdAt: '2024-01-15T12:00:00Z',
        updatedAt: '2024-01-15T12:00:00Z'
      },
      {
        id: 'chapter-4',
        courseId: this.courseId,
        title: 'Routing và Navigation',
        description: 'Học cách sử dụng Angular Router để tạo ứng dụng SPA',
        orderIndex: 4,
        createdAt: '2024-01-15T13:00:00Z',
        updatedAt: '2024-01-15T13:00:00Z'
      },
      {
        id: 'chapter-5',
        courseId: this.courseId,
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
        updatedAt: '2024-01-15T10:00:00Z'
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
        updatedAt: '2024-01-15T10:15:00Z'
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
        updatedAt: '2024-01-15T10:30:00Z'
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
        updatedAt: '2024-01-15T11:00:00Z'
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
        updatedAt: '2024-01-15T11:20:00Z'
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
        updatedAt: '2024-01-15T11:40:00Z'
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
        updatedAt: '2024-01-15T12:00:00Z'
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
        updatedAt: '2024-01-15T12:20:00Z'
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
        updatedAt: '2024-01-15T13:00:00Z'
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
        updatedAt: '2024-01-15T13:30:00Z'
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
        updatedAt: '2024-01-15T14:00:00Z'
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
        updatedAt: '2024-01-15T14:30:00Z'
      }
    ];
  }

  // Computed Properties
  get totalLessons(): number {
    return this.lessons.length;
  }

  get publishedChapters(): number {
    return this.chapters.filter(chapter => 
      this.getChapterLessons(chapter.id).some(lesson => lesson.published)
    ).length;
  }

  get totalDurationFormatted(): string {
    const totalSeconds = this.lessons.reduce((sum, lesson) => 
      sum + (lesson.durationSeconds || 0), 0
    );
    return this.formatDuration(totalSeconds);
  }

  // Chapter helpers
  getChapterLessons(chapterId: string): LessonData[] {
    return this.lessons
      .filter(lesson => lesson.chapterId === chapterId)
      .sort((a, b) => a.orderIndex - b.orderIndex);
  }

  getChapterLessonCount(chapterId: string): number {
    return this.getChapterLessons(chapterId).length;
  }

  getChapterDuration(chapterId: string): string {
    const lessons = this.getChapterLessons(chapterId);
    const totalSeconds = lessons.reduce((sum, lesson) => 
      sum + (lesson.durationSeconds || 0), 0
    );
    return this.formatDuration(totalSeconds);
  }

  // Lesson helpers
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

  // Utility functions
  formatDuration(seconds: number): string {
    if (seconds === 0) return '0m';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Chapter expansion
  toggleChapterExpansion(chapterId: string): void {
    if (this.expandedChapters.has(chapterId)) {
      this.expandedChapters.delete(chapterId);
    } else {
      this.expandedChapters.add(chapterId);
    }
  }

  // Modal management
  openChapterModal(chapter?: ChapterData): void {
    this.editingChapter = chapter || null;
    this.chapterFormData = {
      title: chapter?.title || '',
      description: chapter?.description || '',
      orderIndex: chapter?.orderIndex
    };
    this.showChapterModal = true;
  }

  closeChapterModal(): void {
    this.showChapterModal = false;
    this.editingChapter = null;
    this.chapterFormData = {
      title: '',
      description: '',
      orderIndex: undefined
    };
  }

  // Chapter CRUD operations
  saveChapter(): void {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    
    // Mock API call
    setTimeout(() => {
      if (this.editingChapter) {
        // Update existing chapter
        const index = this.chapters.findIndex(c => c.id === this.editingChapter!.id);
        if (index !== -1) {
          this.chapters[index] = {
            ...this.chapters[index],
            title: this.chapterFormData.title,
            description: this.chapterFormData.description,
            updatedAt: new Date().toISOString()
          };
        }
        console.log('Updated chapter:', this.editingChapter.id);
      } else {
        // Create new chapter
        const newChapter: ChapterData = {
          id: `chapter-${Date.now()}`,
          courseId: this.courseId,
          title: this.chapterFormData.title,
          description: this.chapterFormData.description,
          orderIndex: this.chapterFormData.orderIndex || this.chapters.length + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        // Insert at specified position or add to end
        if (this.chapterFormData.orderIndex) {
          this.chapters.splice(this.chapterFormData.orderIndex - 1, 0, newChapter);
          // Update order indices
          this.reorderChapters();
        } else {
          this.chapters.push(newChapter);
        }
        
        console.log('Created new chapter:', newChapter);
      }
      
      this.isSubmitting = false;
      this.closeChapterModal();
      alert(this.editingChapter ? 'Chương đã được cập nhật!' : 'Chương mới đã được tạo!');
    }, 1500);
  }

  editChapter(chapter: ChapterData): void {
    this.openChapterModal(chapter);
  }

  deleteChapter(chapter: ChapterData): void {
    this.chapterToDelete = chapter;
    this.showDeleteModal = true;
  }

  confirmDeleteChapter(): void {
    if (!this.chapterToDelete || this.isSubmitting) return;
    
    this.isSubmitting = true;
    
    // Mock API call
    setTimeout(() => {
      const chapterId = this.chapterToDelete!.id;
      
      // Remove chapter
      this.chapters = this.chapters.filter(c => c.id !== chapterId);
      
      // Remove associated lessons
      this.lessons = this.lessons.filter(l => l.chapterId !== chapterId);
      
      // Reorder remaining chapters
      this.reorderChapters();
      
      console.log('Deleted chapter:', chapterId);
      
      this.isSubmitting = false;
      this.showDeleteModal = false;
      this.chapterToDelete = null;
      alert('Chương đã được xóa thành công!');
    }, 1500);
  }

  // Reorder chapters
  private reorderChapters(): void {
    this.chapters.forEach((chapter, index) => {
      chapter.orderIndex = index + 1;
    });
  }

  // Get available positions for new chapter
  getAvailablePositions(): number[] {
    return Array.from({ length: this.chapters.length + 1 }, (_, i) => i + 1);
  }

  // Actions
  viewChapterLessons(chapter: ChapterData): void {
    this.toggleChapterExpansion(chapter.id);
  }

  manageLessons(chapter: ChapterData): void {
    // Navigate to lesson management (to be implemented)
    console.log('Navigate to lesson management for chapter:', chapter.id);
    // this.router.navigate(['/courses', this.courseId, 'chapters', chapter.id, 'lessons']);
  }

  // TrackBy functions
  trackByChapterId(index: number, chapter: ChapterData): string {
    return chapter.id;
  }
}
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Interfaces
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

interface ChapterData {
  id: string;
  courseId: string;
  title: string;
  description: string;
  orderIndex: number;
}

interface VideoNote {
  timestamp: number;
  content: string;
  createdAt: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  answers: QuizAnswer[];
  correctAnswerIndex: number;
}

interface QuizAnswer {
  text: string;
  isCorrect?: boolean;
}

@Component({
  selector: 'app-lesson-viewer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './lesson-viewer.html',
  styleUrls: ['./lesson-viewer.css']
})
export class LessonViewerComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  // Route Parameters
  courseId: string = '';
  lessonId: string = '';

  // Component State
  isLoading = false;
  currentLesson: LessonData | null = null;
  currentChapter: ChapterData | null = null;
  allLessons: LessonData[] = [];
  currentLessonIndex = 0;
  totalLessons = 0;

  // Progress Tracking
  progressPercentage = 0;
  isLessonCompleted = false;
  isBookmarked = false;

  // Video State
  isVideoPlaying = false;
  showVideoControls = false;
  currentVideoTime = 0;
  videoDuration = 0;
  playbackSpeed = 1;
  videoNotes: VideoNote[] = [];

  // Document State
  isPdfDocument = false;
  documentContent = '';

  // Quiz State
  quizQuestions: QuizQuestion[] = [];
  currentQuestionIndex = 0;
  selectedAnswer: number | null = null;
  userAnswers: number[] = [];
  quizCompleted = false;
  quizScore = 0;

  // Modal State
  showAddNoteModal = false;
  newNoteContent = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLessonData();
  }

  // Load lesson and related data
  private loadLessonData(): void {
    this.isLoading = true;

    const courseId = this.route.snapshot.paramMap.get('id');
    const lessonId = this.route.snapshot.paramMap.get('lessonId');

    if (!courseId || !lessonId) {
      this.router.navigate(['/courses']);
      return;
    }

    this.courseId = courseId;
    this.lessonId = lessonId;

    // Mock API calls
    setTimeout(() => {
      this.loadAllLessons();
      this.loadCurrentLesson();
      this.loadProgress();
      this.isLoading = false;
    }, 1000);
  }

  private loadAllLessons(): void {
    // Mock all lessons for navigation
    this.allLessons = this.generateMockLessons();
    this.totalLessons = this.allLessons.length;
    this.currentLessonIndex = this.allLessons.findIndex(l => l.id === this.lessonId);
  }

  private loadCurrentLesson(): void {
    this.currentLesson = this.allLessons.find(l => l.id === this.lessonId) || null;
    
    if (this.currentLesson) {
      this.loadChapterInfo();
      this.initializeLessonContent();
    }
  }

  private loadChapterInfo(): void {
    // Mock chapter data
    const chapters = this.generateMockChapters();
    this.currentChapter = chapters.find(c => c.id === this.currentLesson?.chapterId) || null;
  }

  private loadProgress(): void {
    // Mock progress data
    this.progressPercentage = Math.round(((this.currentLessonIndex + 1) / this.totalLessons) * 100);
    this.isLessonCompleted = Math.random() > 0.7; // Random completion status
    this.isBookmarked = Math.random() > 0.8; // Random bookmark status
  }

  private initializeLessonContent(): void {
    if (!this.currentLesson) return;

    switch (this.currentLesson.lessonType) {
      case 'VIDEO':
        this.loadVideoNotes();
        break;
      case 'DOCUMENT':
        this.loadDocumentContent();
        break;
      case 'QUIZ':
        this.loadQuizQuestions();
        break;
    }
  }

  // Generate mock data
  private generateMockLessons(): LessonData[] {
    return [
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
        title: 'Cài đặt môi trường phát triển',
        description: 'Hướng dẫn cài đặt Node.js, Angular CLI và các công cụ cần thiết',
        lessonType: 'DOCUMENT',
        contentUrl: '/assets/docs/setup-guide.pdf',
        durationSeconds: 0,
        orderIndex: 2,
        published: true,
        createdAt: '2024-01-15T10:15:00Z',
        updatedAt: '2024-01-15T10:15:00Z'
      },
      {
        id: 'lesson-1-3',
        chapterId: 'chapter-1',
        title: 'Kiểm tra kiến thức cơ bản',
        description: 'Bài kiểm tra để đánh giá hiểu biết về Angular cơ bản',
        lessonType: 'QUIZ',
        contentUrl: '',
        durationSeconds: 0,
        orderIndex: 3,
        published: true,
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z'
      }
    ];
  }

  private generateMockChapters(): ChapterData[] {
    return [
      {
        id: 'chapter-1',
        courseId: this.courseId,
        title: 'Giới thiệu và cài đặt môi trường',
        description: 'Tìm hiểu về Angular và cách thiết lập môi trường phát triển',
        orderIndex: 1
      }
    ];
  }

  // Video handling
  private loadVideoNotes(): void {
    this.videoNotes = [
      {
        timestamp: 120,
        content: 'Angular được phát triển bởi Google team',
        createdAt: new Date().toISOString()
      },
      {
        timestamp: 300,
        content: 'Sự khác biệt giữa AngularJS và Angular',
        createdAt: new Date().toISOString()
      }
    ];
  }

  onVideoLoaded(): void {
    if (this.videoPlayer?.nativeElement) {
      this.videoDuration = this.videoPlayer.nativeElement.duration;
    }
  }

  onVideoProgress(event: Event): void {
    const video = event.target as HTMLVideoElement;
    this.currentVideoTime = video.currentTime;
    this.isVideoPlaying = !video.paused;
  }

  onVideoEnded(): void {
    this.isVideoPlaying = false;
    // Auto-mark as completed
    if (!this.isLessonCompleted) {
      this.isLessonCompleted = true;
      this.toggleLessonCompletion();
    }
  }

  togglePlayPause(): void {
    if (this.videoPlayer?.nativeElement) {
      const video = this.videoPlayer.nativeElement;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  }

  changePlaybackSpeed(): void {
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.playbackRate = this.playbackSpeed;
    }
  }

  seekToTime(timestamp: number): void {
    if (this.videoPlayer?.nativeElement) {
      this.videoPlayer.nativeElement.currentTime = timestamp;
    }
  }

  // Video notes
  addNote(): void {
    this.newNoteContent = '';
    this.showAddNoteModal = true;
  }

  saveNote(): void {
    if (!this.newNoteContent.trim()) return;

    const newNote: VideoNote = {
      timestamp: this.currentVideoTime,
      content: this.newNoteContent.trim(),
      createdAt: new Date().toISOString()
    };

    this.videoNotes.push(newNote);
    this.videoNotes.sort((a, b) => a.timestamp - b.timestamp);
    
    console.log('Added note:', newNote);
    this.closeAddNoteModal();
  }

  deleteNote(index: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa ghi chú này?')) {
      this.videoNotes.splice(index, 1);
    }
  }

  closeAddNoteModal(): void {
    this.showAddNoteModal = false;
    this.newNoteContent = '';
  }

  // Document handling
  private loadDocumentContent(): void {
    if (this.currentLesson?.contentUrl?.endsWith('.pdf')) {
      this.isPdfDocument = true;
    } else {
      this.isPdfDocument = false;
      // Mock HTML content for text documents
      this.documentContent = `
        <h2>Cài đặt môi trường phát triển Angular</h2>
        <p>Để bắt đầu phát triển ứng dụng Angular, bạn cần cài đặt các công cụ sau:</p>
        <h3>1. Node.js và npm</h3>
        <p>Angular yêu cầu Node.js phiên bản 14 trở lên...</p>
        <h3>2. Angular CLI</h3>
        <p>Angular CLI là công cụ command-line để tạo và quản lý dự án Angular...</p>
      `;
    }
  }

  downloadDocument(): void {
    if (this.currentLesson?.contentUrl) {
      window.open(this.currentLesson.contentUrl, '_blank');
    }
  }

  openDocumentFullscreen(): void {
    if (this.currentLesson?.contentUrl) {
      window.open(this.currentLesson.contentUrl, '_blank', 'fullscreen=yes');
    }
  }

  // Quiz handling
  private loadQuizQuestions(): void {
    this.quizQuestions = [
      {
        id: 'q1',
        question: 'Angular được phát triển bởi công ty nào?',
        answers: [
          { text: 'Facebook' },
          { text: 'Google' },
          { text: 'Microsoft' },
          { text: 'Apple' }
        ],
        correctAnswerIndex: 1
      },
      {
        id: 'q2',
        question: 'Angular sử dụng ngôn ngữ lập trình nào?',
        answers: [
          { text: 'JavaScript' },
          { text: 'TypeScript' },
          { text: 'Python' },
          { text: 'Java' }
        ],
        correctAnswerIndex: 1
      },
      {
        id: 'q3',
        question: 'CLI trong Angular CLI có nghĩa là gì?',
        answers: [
          { text: 'Command Line Interface' },
          { text: 'Client Library Interface' },
          { text: 'Component Logic Interface' },
          { text: 'Code Language Interface' }
        ],
        correctAnswerIndex: 0
      }
    ];

    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.userAnswers = [];
    this.quizCompleted = false;
    this.quizScore = 0;
  }

  get currentQuestion(): QuizQuestion | null {
    return this.quizQuestions[this.currentQuestionIndex] || null;
  }

  get isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.quizQuestions.length - 1;
  }

  nextQuestion(): void {
    if (this.selectedAnswer === null) return;

    // Save answer
    this.userAnswers[this.currentQuestionIndex] = this.selectedAnswer;

    if (this.isLastQuestion) {
      this.completeQuiz();
    } else {
      this.currentQuestionIndex++;
      this.selectedAnswer = this.userAnswers[this.currentQuestionIndex] ?? null;
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.userAnswers[this.currentQuestionIndex] = this.selectedAnswer || 0;
      this.currentQuestionIndex--;
      this.selectedAnswer = this.userAnswers[this.currentQuestionIndex] ?? null;
    }
  }

  completeQuiz(): void {
    // Calculate score
    this.quizScore = 0;
    this.quizQuestions.forEach((question, index) => {
      if (this.userAnswers[index] === question.correctAnswerIndex) {
        this.quizScore++;
      }
    });

    this.quizCompleted = true;
    
    // Auto-mark as completed if passing score
    if (this.getScorePercentage() >= 70) {
      this.isLessonCompleted = true;
      this.toggleLessonCompletion();
    }
  }

  retakeQuiz(): void {
    this.loadQuizQuestions();
  }

  getScorePercentage(): number {
    return Math.round((this.quizScore / this.quizQuestions.length) * 100);
  }

  getScoreClass(): string {
    const percentage = this.getScorePercentage();
    if (percentage >= 80) return 'excellent';
    if (percentage >= 60) return 'good';
    return 'poor';
  }

  getScoreMessage(): string {
    const percentage = this.getScorePercentage();
    if (percentage >= 80) return 'Xuất sắc!';
    if (percentage >= 60) return 'Tốt!';
    return 'Cần cải thiện';
  }

  // Navigation
  get hasPreviousLesson(): boolean {
    return this.currentLessonIndex > 0;
  }

  get hasNextLesson(): boolean {
    return this.currentLessonIndex < this.totalLessons - 1;
  }

  goToPreviousLesson(): void {
    if (this.hasPreviousLesson) {
      const prevLesson = this.allLessons[this.currentLessonIndex - 1];
      this.router.navigate(['/courses', this.courseId, 'lessons', prevLesson.id]);
    }
  }

  goToNextLesson(): void {
    if (this.hasNextLesson) {
      const nextLesson = this.allLessons[this.currentLessonIndex + 1];
      this.router.navigate(['/courses', this.courseId, 'lessons', nextLesson.id]);
    }
  }

  continueToNextLesson(): void {
    this.goToNextLesson();
  }

  goBackToCourse(): void {
    this.router.navigate(['/courses', this.courseId]);
  }

  // Actions
  toggleLessonCompletion(): void {
    // Mock API call to update completion status
    console.log('Lesson completion status:', this.isLessonCompleted);
  }

  bookmarkLesson(): void {
    this.isBookmarked = !this.isBookmarked;
    console.log('Bookmark status:', this.isBookmarked);
  }

  shareLesson(): void {
    const shareUrl = `${window.location.origin}/courses/${this.courseId}/lessons/${this.lessonId}`;
    if (navigator.share) {
      navigator.share({
        title: this.currentLesson?.title,
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Đã sao chép liên kết!');
    }
  }

  // Utility functions
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

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
}
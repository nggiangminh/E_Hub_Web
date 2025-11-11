import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';

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

interface Lesson {
  id: number;
  title: string;
  duration: number;
  completed: boolean;
  isCurrent: boolean;
  accessible: boolean;
}

interface Chapter {
  id: number;
  title: string;
  totalLessons: number;
  completedLessons: number;
  completed: boolean;
  isCurrent: boolean;
  expanded: boolean;
  lessons: Lesson[];
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface CalendarDay {
  day: number;
  hasStudy: boolean;
  isToday: boolean;
  studyTime?: number;
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

@Component({
  selector: 'app-enrollment-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './enrollment-details.component.html',
  styleUrls: ['./enrollment-details.component.css']
})
export class EnrollmentDetailsComponent implements OnInit {
  enrollment: Enrollment | null = null;
  chapters: Chapter[] = [];
  achievements: Achievement[] = [];
  calendarDays: CalendarDay[] = [];
  studyStreak = 0;

  // Make Math available to template
  Math = Math;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const enrollmentId = this.route.snapshot.paramMap.get('id');
    if (enrollmentId) {
      this.loadEnrollmentDetails(parseInt(enrollmentId));
    }
  }

  loadEnrollmentDetails(enrollmentId: number): void {
    // Mock data - replace with actual API call
    this.enrollment = this.generateMockEnrollment(enrollmentId);
    this.chapters = this.generateMockChapters();
    this.achievements = this.generateMockAchievements();
    this.calendarDays = this.generateCalendarDays();
    this.studyStreak = Math.floor(Math.random() * 15) + 1;
  }

  generateMockEnrollment(id: number): Enrollment {
    const courses: Course[] = [
      {
        id: 1,
        title: 'JavaScript Căn Bản Đến Nâng Cao',
        instructor: 'Nguyễn Văn An',
        thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
        description: 'Khóa học JavaScript toàn diện từ cơ bản đến nâng cao với các dự án thực tế. Bạn sẽ học được cú pháp, DOM manipulation, ES6+, và nhiều concept quan trọng khác.',
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
        description: 'Tạo ứng dụng web tương tác với React.js và các thư viện hiện đại như Redux, React Router và nhiều công cụ khác.',
        level: 'INTERMEDIATE',
        category: 'Frontend',
        duration: 150,
        totalLessons: 60
      }
    ];

    const course = courses[Math.min(id - 1, courses.length - 1)] || courses[0];
    const progress = Math.floor(Math.random() * 100);
    const completedLessons = Math.floor(course.totalLessons * (progress / 100));

    return {
      id,
      course,
      status: progress === 100 ? 'COMPLETED' : 'ACTIVE',
      enrolledAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
      lastAccessed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      progress,
      completedLessons,
      totalLessons: course.totalLessons,
      studyTime: Math.floor(Math.random() * 80 + 20),
      nextLessonId: progress < 100 ? completedLessons + 1 : undefined,
      isFavorite: Math.random() > 0.5
    };
  }

  generateMockChapters(): Chapter[] {
    const chapterTemplates = [
      { title: 'Giới thiệu và Cài đặt', lessonCount: 5 },
      { title: 'Cú pháp cơ bản', lessonCount: 8 },
      { title: 'Functions và Objects', lessonCount: 10 },
      { title: 'DOM Manipulation', lessonCount: 12 },
      { title: 'ES6+ Features', lessonCount: 10 }
    ];

    return chapterTemplates.map((template, chapterIndex) => {
      const completedLessons = Math.floor(template.lessonCount * Math.random());
      const lessons: Lesson[] = [];

      for (let i = 0; i < template.lessonCount; i++) {
        lessons.push({
          id: chapterIndex * 20 + i + 1,
          title: `Bài ${i + 1}: ${this.generateLessonTitle(template.title, i)}`,
          duration: Math.floor(Math.random() * 20) + 5,
          completed: i < completedLessons,
          isCurrent: i === completedLessons,
          accessible: i <= completedLessons
        });
      }

      return {
        id: chapterIndex + 1,
        title: template.title,
        totalLessons: template.lessonCount,
        completedLessons,
        completed: completedLessons === template.lessonCount,
        isCurrent: completedLessons < template.lessonCount && completedLessons > 0,
        expanded: chapterIndex === 0 || (completedLessons < template.lessonCount && completedLessons > 0),
        lessons
      };
    });
  }

  generateLessonTitle(chapterTitle: string, lessonIndex: number): string {
    const lessonTitles: { [key: string]: string[] } = {
      'Giới thiệu và Cài đặt': [
        'Tổng quan về khóa học',
        'Cài đặt môi trường',
        'Code editor và tools',
        'Hello World đầu tiên',
        'Cấu trúc thư mục dự án'
      ],
      'Cú pháp cơ bản': [
        'Variables và Data Types',
        'Operators và Expressions',
        'Conditional Statements',
        'Loops và Iterations',
        'Arrays cơ bản',
        'String Methods',
        'Number Methods',
        'Boolean Logic'
      ],
      'Functions và Objects': [
        'Function Declaration',
        'Function Expression',
        'Arrow Functions',
        'Parameters và Arguments',
        'Return Values',
        'Object Literal',
        'Object Methods',
        'Object Properties',
        'This Keyword',
        'Destructuring'
      ]
    };

    const titles = lessonTitles[chapterTitle] || [`Nội dung ${lessonIndex + 1}`];
    return titles[Math.min(lessonIndex, titles.length - 1)] || `Bài học ${lessonIndex + 1}`;
  }

  generateMockAchievements(): Achievement[] {
    const achievementTemplates = [
      {
        title: 'Bước đầu tiên',
        description: 'Hoàn thành bài học đầu tiên',
        icon: '🎯',
        unlocked: true
      },
      {
        title: 'Học giả nhỏ',
        description: 'Hoàn thành 10 bài học',
        icon: '📚',
        unlocked: true
      },
      {
        title: 'Kiên trì',
        description: 'Học 7 ngày liên tiếp',
        icon: '🔥',
        unlocked: this.studyStreak >= 7
      },
      {
        title: 'Nửa chặng đường',
        description: 'Hoàn thành 50% khóa học',
        icon: '🎖️',
        unlocked: this.enrollment ? this.enrollment.progress >= 50 : false
      },
      {
        title: 'Chuyên gia',
        description: 'Hoàn thành toàn bộ khóa học',
        icon: '🏆',
        unlocked: this.enrollment ? this.enrollment.status === 'COMPLETED' : false
      },
      {
        title: 'Siêu tốc',
        description: 'Hoàn thành 5 bài trong 1 ngày',
        icon: '⚡',
        unlocked: Math.random() > 0.5
      }
    ];

    return achievementTemplates.map((template, index) => ({
      id: index + 1,
      title: template.title,
      description: template.description,
      icon: template.icon,
      unlocked: template.unlocked,
      unlockedAt: template.unlocked ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) : undefined
    }));
  }

  generateCalendarDays(): CalendarDay[] {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const days: CalendarDay[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const hasStudy = Math.random() > 0.7; // 30% chance of studying
      days.push({
        day: i,
        hasStudy,
        isToday: i === today.getDate(),
        studyTime: hasStudy ? Math.floor(Math.random() * 120) + 30 : undefined
      });
    }

    return days;
  }

  getStudyDaysThisMonth(): number {
    return this.calendarDays.filter(day => day.hasStudy).length;
  }

  getLevelText(level: string): string {
    const levelMap: { [key: string]: string } = {
      'BEGINNER': 'Cơ bản',
      'INTERMEDIATE': 'Trung bình',
      'ADVANCED': 'Nâng cao'
    };
    return levelMap[level] || level;
  }

  toggleChapter(chapter: Chapter): void {
    chapter.expanded = !chapter.expanded;
  }

  downloadCertificate(): void {
    if (this.enrollment?.status === 'COMPLETED') {
      // Mock certificate download
      alert('Chứng chỉ đang được tạo và sẽ được tải xuống trong giây lát!');
      console.log('Downloading certificate for enrollment:', this.enrollment.id);
    }
  }

  shareProgress(): void {
    if (this.enrollment) {
      const shareText = `Tôi đã hoàn thành ${this.enrollment.progress}% khóa học "${this.enrollment.course.title}"! 🎯`;
      
      if (navigator.share) {
        navigator.share({
          title: 'Tiến độ học tập của tôi',
          text: shareText,
          url: window.location.href
        }).catch(console.error);
      } else {
        // Fallback for browsers without native sharing
        navigator.clipboard.writeText(shareText + ' ' + window.location.href)
          .then(() => alert('Link đã được sao chép vào clipboard!'))
          .catch(() => alert('Không thể chia sẻ. Vui lòng thử lại!'));
      }
    }
  }

  exportProgressReport(): void {
    if (this.enrollment) {
      const reportData = {
        course: this.enrollment.course.title,
        instructor: this.enrollment.course.instructor,
        enrolledAt: this.formatDate(this.enrollment.enrolledAt),
        progress: this.enrollment.progress,
        completedLessons: this.enrollment.completedLessons,
        totalLessons: this.enrollment.totalLessons,
        studyTime: this.enrollment.studyTime,
        studyStreak: this.studyStreak,
        achievements: this.achievements.filter(a => a.unlocked).length,
        studyDaysThisMonth: this.getStudyDaysThisMonth()
      };

      const csvContent = this.convertReportToCSV(reportData);
      this.downloadCSV(csvContent, `progress-report-${this.enrollment.course.title.replace(/\s+/g, '-')}.csv`);
    }
  }

  private convertReportToCSV(data: any): string {
    const rows = [
      ['Metric', 'Value'],
      ['Course Title', data.course],
      ['Instructor', data.instructor],
      ['Enrolled Date', data.enrolledAt],
      ['Progress (%)', data.progress],
      ['Completed Lessons', data.completedLessons],
      ['Total Lessons', data.totalLessons],
      ['Study Time (hours)', data.studyTime],
      ['Study Streak (days)', data.studyStreak],
      ['Achievements Unlocked', data.achievements],
      ['Study Days This Month', data.studyDaysThisMonth]
    ];

    return rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
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
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
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
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  popular?: boolean;
}

interface Discount {
  code: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  minAmount?: number;
}

interface EnrollmentFormData {
  fullName: string;
  email: string;
  phone: string;
  occupation: string;
  learningGoals: string;
  experience: string;
  paymentMethod: string;
  agreeTerms: boolean;
  subscribeNewsletter: boolean;
}

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './enrollment-form.component.html',
  styleUrls: ['./enrollment-form.component.css']
})
export class EnrollmentFormComponent implements OnInit {
  selectedCourse: Course | null = null;
  discountCode = '';
  selectedDiscount: Discount | null = null;
  isSubmitting = false;
  showTermsModal = false;

  formData: EnrollmentFormData = {
    fullName: '',
    email: '',
    phone: '',
    occupation: '',
    learningGoals: '',
    experience: 'beginner',
    paymentMethod: '',
    agreeTerms: false,
    subscribeNewsletter: false
  };

  paymentMethods: PaymentMethod[] = [
    {
      id: 'vnpay',
      name: 'VNPay',
      description: 'Thanh toán qua VNPay (ATM, Visa, MasterCard)',
      icon: '💳',
      popular: true
    },
    {
      id: 'momo',
      name: 'Ví MoMo',
      description: 'Thanh toán qua ví điện tử MoMo',
      icon: '📱'
    },
    {
      id: 'zalopay',
      name: 'ZaloPay',
      description: 'Thanh toán qua ví điện tử ZaloPay',
      icon: '💰'
    },
    {
      id: 'bank_transfer',
      name: 'Chuyển khoản ngân hàng',
      description: 'Chuyển khoản trực tiếp qua ngân hàng',
      icon: '🏦'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Thanh toán quốc tế qua PayPal',
      icon: '🌐'
    }
  ];

  availableDiscounts: Discount[] = [
    {
      code: 'WELCOME10',
      description: 'Giảm 10% cho học viên mới',
      type: 'percentage',
      value: 10
    },
    {
      code: 'STUDENT50',
      description: 'Giảm 50k cho sinh viên',
      type: 'fixed',
      value: 50000,
      minAmount: 200000
    },
    {
      code: 'FLASH20',
      description: 'Flash sale giảm 20%',
      type: 'percentage',
      value: 20,
      minAmount: 300000
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    if (courseId) {
      this.loadCourseDetails(parseInt(courseId));
    }
    
    // Pre-fill form with user data if available
    this.loadUserData();
  }

  loadCourseDetails(courseId: number): void {
    // Mock data - replace with actual API call
    this.selectedCourse = this.generateMockCourse(courseId);
  }

  generateMockCourse(id: number): Course {
    const courses: Course[] = [
      {
        id: 1,
        title: 'JavaScript Căn Bản Đến Nâng Cao',
        instructor: 'Nguyễn Văn An',
        thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
        description: 'Khóa học JavaScript toàn diện từ cơ bản đến nâng cao với các dự án thực tế. Bạn sẽ học được cú pháp, DOM manipulation, ES6+, và nhiều concept quan trọng khác để trở thành một lập trình viên JavaScript chuyên nghiệp.',
        level: 'BEGINNER',
        category: 'Lập trình',
        duration: 120,
        totalLessons: 45,
        price: 1500000,
        originalPrice: 2000000,
        rating: 4.8,
        reviewCount: 1234
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
        totalLessons: 60,
        price: 2200000,
        originalPrice: 2800000,
        rating: 4.9,
        reviewCount: 892
      }
    ];

    return courses[Math.min(id - 1, courses.length - 1)] || courses[0];
  }

  loadUserData(): void {
    // Mock user data - replace with actual user service
    const userData = {
      fullName: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0123456789'
    };

    // Pre-fill if user is logged in
    if (userData.email) {
      this.formData.fullName = userData.fullName;
      this.formData.email = userData.email;
      this.formData.phone = userData.phone;
    }
  }

  getLevelText(level: string): string {
    const levelMap: { [key: string]: string } = {
      'BEGINNER': 'Cơ bản',
      'INTERMEDIATE': 'Trung bình',
      'ADVANCED': 'Nâng cao'
    };
    return levelMap[level] || level;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }

  getRatingStars(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < Math.floor(rating));
  }

  applyDiscount(): void {
    if (!this.discountCode.trim()) return;

    const discount = this.availableDiscounts.find(
      d => d.code.toUpperCase() === this.discountCode.toUpperCase()
    );

    if (discount) {
      if (discount.minAmount && this.selectedCourse && this.selectedCourse.price < discount.minAmount) {
        alert(`Mã giảm giá này yêu cầu đơn hàng tối thiểu ${this.formatPrice(discount.minAmount)}`);
        return;
      }
      
      this.selectedDiscount = discount;
      alert('Áp dụng mã giảm giá thành công!');
    } else {
      alert('Mã giảm giá không hợp lệ hoặc đã hết hạn!');
    }
  }

  getDiscountAmount(): number {
    if (!this.selectedDiscount || !this.selectedCourse) return 0;

    if (this.selectedDiscount.type === 'percentage') {
      return (this.selectedCourse.price * this.selectedDiscount.value) / 100;
    } else {
      return this.selectedDiscount.value;
    }
  }

  getFinalPrice(): number {
    if (!this.selectedCourse) return 0;
    return Math.max(0, this.selectedCourse.price - this.getDiscountAmount());
  }

  showTerms(event: Event): void {
    event.preventDefault();
    this.showTermsModal = true;
  }

  showPrivacy(event: Event): void {
    event.preventDefault();
    // For now, show the same modal. In real app, you'd have separate privacy policy
    this.showTermsModal = true;
  }

  closeModal(): void {
    this.showTermsModal = false;
  }

  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(form.controls).forEach(key => {
        form.controls[key].markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;

    try {
      // Mock API call - replace with actual enrollment service
      await this.processEnrollment();
      
      // Success - redirect to success page or enrollment details
      alert('Đăng ký thành công! Bạn sẽ được chuyển đến trang thanh toán.');
      this.router.navigate(['/enrollments', 'success'], {
        queryParams: {
          courseId: this.selectedCourse?.id,
          amount: this.getFinalPrice()
        }
      });
    } catch (error) {
      console.error('Enrollment error:', error);
      alert('Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại!');
    } finally {
      this.isSubmitting = false;
    }
  }

  private async processEnrollment(): Promise<void> {
    // Mock enrollment process
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Enrollment data:', {
          course: this.selectedCourse,
          formData: this.formData,
          discount: this.selectedDiscount,
          finalPrice: this.getFinalPrice()
        });
        resolve();
      }, 2000);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
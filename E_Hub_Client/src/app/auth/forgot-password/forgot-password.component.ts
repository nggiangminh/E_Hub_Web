import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isSubmitted = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      console.log('Forgot password form submitted:', this.forgotPasswordForm.value);
      
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.isSubmitted = true;
      }, 2000);
      
      // TODO: Implement forgot password logic
    }
  }

  resendEmail() {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      console.log('Resending email:', this.forgotPasswordForm.value);
      
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
    }
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  navigateToSignup() {
    this.router.navigate(['/auth/signup']);
  }
}
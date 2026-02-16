import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  success = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }

    // Initialize form
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.forgotForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    this.success = '';

    // Stop if form is invalid
    if (this.forgotForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.forgotPassword({ email: this.f['email'].value }).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.status) {
          this.success = response.message || 'Password reset link has been sent to your email.';
        } else {
          this.error = response.message || 'ForgotPassword request failed. Please try again.';
        }
      },
      error: (error) => {
        this.loading = false;
        this.error = error.message || 'ForgotPassword request failed. Please check your email and try again.';
      }
    });
  }
}

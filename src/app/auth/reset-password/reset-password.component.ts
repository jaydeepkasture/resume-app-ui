import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  success = '';
  showPassword = false;
  showConfirmPassword = false;

  token: string = '';
  email: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Collect token and email from query params
    this.token = this.route.snapshot.queryParams['token'] || '';
    this.email = this.route.snapshot.queryParams['email'] || '';

    if (!this.token || !this.email) {
      this.error = 'Invalid reset link. Please request a new one.';
    }

    // Initialize form
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.resetForm.controls;
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    this.success = '';

    // Stop if form is invalid or missing params
    if (this.resetForm.invalid || !this.token || !this.email) {
      return;
    }

    this.loading = true;

    const resetData = {
      email: this.email,
      token: this.token,
      password: this.f['password'].value,
      confirmPassword: this.f['confirmPassword'].value
    };

    this.authService.resetPassword(resetData).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.status) {
          this.success = response.message || 'Your password has been reset successfully.';
        } else {
          this.error = response.message || 'Reset password failed. Please try again.';
        }
      },
      error: (error) => {
        this.loading = false;
        this.error = error.message || 'Reset password failed. Please request a new link.';
      }
    });
  }
}

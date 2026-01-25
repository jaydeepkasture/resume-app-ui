import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  showPassword = false;
  showConfirmPassword = false;

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

    // Initialize form with validation
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
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

  get f() {
    return this.registerForm.controls;
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

    if (this.registerForm.invalid) {
      console.log('Form is invalid:', this.registerForm.errors);
      return;
    }

    this.loading = true;

    const userData = {
      email: this.f['email'].value,
      password: this.f['password'].value
    };

    console.log('📤 Sending registration request:', { email: userData.email });

    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log('✅ Registration response:', response);
        if (response.status) {
          this.router.navigate(['/']);
        } else {
          this.error = response.message || 'Registration failed. Please try again.';
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('❌ Registration error:', error);
        
        // Provide more specific error messages
        if (error.message.includes('0 Unknown Error')) {
          this.error = `Cannot connect to server. Please ensure the backend is running on ${environment.apiUrl.replace('/api', '')}`;
        } else if (error.message.includes('CORS')) {
          this.error = 'CORS error. Please check backend CORS configuration.';
        } else {
          this.error = error.message || 'Registration failed. Please try again.';
        }
        
        this.loading = false;
      }
    });
  }
}

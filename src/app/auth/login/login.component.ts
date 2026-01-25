import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  returnUrl = '';
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Redirect if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }

    // Initialize form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });

    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // Convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';

    console.log('=== LOGIN FORM DEBUG ===');
    console.log('Form valid:', this.loginForm.valid);
    console.log('Form value:', this.loginForm.value);
    console.log('Form errors:', this.loginForm.errors);

    // Stop if form is invalid
    if (this.loginForm.invalid) {
      console.log('❌ Form is invalid, stopping');
      return;
    }

    this.loading = true;

    const credentials = {
      email: this.f['email'].value,
      password: this.f['password'].value
    };

    console.log('📤 Sending credentials:', credentials);
    console.log('📤 Credentials type:', typeof credentials);
    console.log('📤 Credentials JSON:', JSON.stringify(credentials));

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('✅ Login response received:', response);
        console.log('  Response status:', response.status);
        console.log('  Response message:', response.message);
        console.log('  Response data:', response.data);
        
        if (response.status) {
          console.log('✅ Login successful, navigating to:', this.returnUrl);
          
          // Set loading to false before navigation
          this.loading = false;
          
          // Navigate to return url or home
          this.router.navigate([this.returnUrl]).then(
            success => {
              console.log('✅ Navigation successful:', success);
            },
            error => {
              console.error('❌ Navigation failed:', error);
              this.error = 'Navigation failed. Please try again.';
              this.loading = false;
            }
          );
        } else {
          console.log('❌ Login failed:', response.message);
          this.error = response.message || 'Login failed. Please try again.';
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('❌ Login error:', error);
        console.error('  Error message:', error.message);
        console.error('  Error object:', error);
        this.error = error.message || 'Login failed. Please check your credentials.';
        this.loading = false;
      }
    });
  }
}

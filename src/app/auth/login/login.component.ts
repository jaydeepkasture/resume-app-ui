import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from '../../../environments/environment';

declare var google: any;

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
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {}

  googleClientId: string = '';

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

    // Fetch Google Client ID from backend
    this.authService.getGoogleClientId().subscribe({
      next: (clientId) => {
        this.googleClientId = clientId;
        // Load Google Sign-In Script after getting the ID
        this.loadGoogleScript();
      },
      error: (err) => {
        console.error('❌ Failed to load Google Client ID:', err);
        // Fallback or show error? For now, we'll try to load it anyway 
        // but it will likely fail if clientId is empty
        this.error = 'Failed to initialize Google login. Refresh the page.';
      }
    });
  }

  loadGoogleScript() {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.initializeGoogleSignIn();
    };
    document.body.appendChild(script);
  }

  initializeGoogleSignIn() {
    if (!this.googleClientId) {
      console.error('❌ Google Client ID is missing');
      return;
    }
    
    google.accounts.id.initialize({
      client_id: this.googleClientId,
      callback: this.handleGoogleCredentialResponse.bind(this)
    });

    
    const buttonDiv = document.getElementById('google-btn');
    if (buttonDiv) {
      google.accounts.id.renderButton(
        buttonDiv,
        { 
          theme: 'outline', 
          size: 'large', 
          width: buttonDiv.offsetWidth || 344, // Match container width or fallback
          text: 'continue_with',
          shape: 'rectangular',
          logo_alignment: 'left'
        }
      );

    }
  }

  handleGoogleCredentialResponse(response: any) {
    this.ngZone.run(() => {
      if (response.credential) {
        this.loading = true; // Show loading state
        this.authService.verifyGoogleToken(response.credential).subscribe({
          next: (res) => {
            if (res.status) {
               this.loading = false;
               this.router.navigate([this.returnUrl]);
            } else {
               this.error = res.message || 'Google login failed';
               this.loading = false;
            }
          },
          error: (err) => {
            console.error('❌ Google Login error:', err);
            this.error = err.message || 'Google login failed';
            this.loading = false;
          }
        });
      }
    });
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

    // Stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    const credentials = {
      email: this.f['email'].value,
      password: this.f['password'].value
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response.status) {
          // Set loading to false before navigation
          this.loading = false;
          
          // Navigate to return url or home
          this.router.navigate([this.returnUrl]);
        } else {
          this.error = response.message || 'Login failed. Please try again.';
          this.loading = false;
        }
      },
      error: (error) => {
        this.error = error.message || 'Login failed. Please check your credentials.';
        this.loading = false;
      }
    });
  }
}

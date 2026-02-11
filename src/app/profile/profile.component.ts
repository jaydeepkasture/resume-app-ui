import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../services/state.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isLoading = false;
  isSaving = false;
  message = '';
  messageType: 'success' | 'error' = 'success';
  
  // Form fields
  firstName = '';
  lastName = '';
  phone = '';
  email = ''; // Read-only

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    if (this.user) {
      this.firstName = this.user.firstName || '';
      this.lastName = this.user.lastName || '';
      this.phone = this.user.phoneNumber || this.user.phone || '';
      this.email = this.user.email || '';
    } else {
      this.router.navigate(['/login']);
    }
  }

  goBack(): void {
    this.location.back();
  }

  goToBilling(): void {
    this.router.navigate(['/billing/plans']);
  }

  onSubmit(): void {
    if (!this.user) return;
    
    this.isSaving = true;
    this.message = '';
    
    // Prepare update data
    const updateData: Partial<User> = {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phone
    };
    
    this.authService.updateProfile(updateData).subscribe({
      next: (response) => {
        this.message = 'Profile updated successfully';
        this.messageType = 'success';
        this.isSaving = false;
      },
      error: (error) => {
        this.message = error.message || 'Failed to update profile';
        this.messageType = 'error';
        this.isSaving = false;
      }
    });
  }
}

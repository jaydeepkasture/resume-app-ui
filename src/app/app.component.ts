import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'resume-in-1-min';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.loadUserBenefits();
    }
  }
}

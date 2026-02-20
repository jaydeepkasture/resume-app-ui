import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-refund-policy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './refund-policy.component.html',
  styleUrl: './refund-policy.component.css'
})
export class RefundPolicyComponent {
  currentYear = new Date().getFullYear();
}

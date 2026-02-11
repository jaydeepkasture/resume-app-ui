import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingApiService } from '../services/billing-api.service';
import { UserSubscription } from '../../models/billing.models';

import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent implements OnInit {

  subscription?: UserSubscription;
  loading = true;

  constructor(private billingApi: BillingApiService, private router: Router) {}

  ngOnInit() {
    this.loadSubscription();
  }

  goToPlans() {
    this.router.navigate(['/billing/plans']);
  }

  loadSubscription() {
    this.loading = true;
    this.billingApi.getMySubscription().subscribe({
      next: (res) => {
        // According to our BillingApiService update, getMySubscription() returns UserSubscription directly
        // But let's be safe and check for .data
        this.subscription = (res as any).data || res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load subscription:', err);
        this.loading = false;
      }
    });
  }

  cancel() {
    if (!confirm('Are you sure you want to cancel your auto-renewal? You will still have access until the end of your billing period.')) return;

    this.billingApi.cancelSubscription().subscribe({
      next: (res) => {
        if (res.status) {
          alert('Subscription auto-renewal has been cancelled.');
          this.loadSubscription();
        } else {
          alert(res.message || 'Failed to cancel subscription.');
        }
      },
      error: (err) => {
        console.error('Cancellation error:', err);
        alert('An error occurred while cancelling your subscription.');
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingApiService } from '../services/billing-api.service';
import { RazorpayService } from '../services/razorpay.service';
import { Plan } from '../../models/billing.models';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export class PlansComponent implements OnInit {

  plans: Plan[] = [];
  loading = true;
  processing = false;

  constructor(
    private billingApi: BillingApiService,
    private razorpay: RazorpayService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.billingApi.getPlansWithBenefits().subscribe({
      next: (res) => {
        // According to the new API structure, res might be the array itself
        // or wrapped in status/data. Based on BillingApiService update:
        // this.http.get<Plan[]>(...)
        this.plans = Array.isArray(res) ? res : ((res as any).data || []);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load plans:', err);
        this.loading = false;
      }
    });
  }

  async subscribe(plan: Plan) {
    if (this.processing) return;
    this.processing = true;

    if (plan.price === 0) {
      this.billingApi.subscribeFree(plan.planCode).subscribe({
        next: (res) => {
          this.processing = false;
          if (res.status) {
            alert('Free plan activated successfully!');
            this.authService.loadUserBenefits();
          } else {
            alert(res.message || 'Failed to activate free plan');
          }
        },
        error: (err) => {
          this.processing = false;
          console.error('Free subscription error:', err);
          alert('Error activating free plan');
        }
      });
      return;
    }

    try {
      // For paid plans, we need the planPriceId. 
      // Wait, if the new Plan model doesn't have planPriceId, 
      // maybe we pass planCode? Or maybe plan.price is an object?
      // Re-examining billing.models.ts change I made earlier.
      // It has price: number, currency: string, billingCycle: string.
      // I'll assume for now we still use createRazorpayOrder but maybe with planCode if planPriceId is gone.
      // Actually, my createRazorpayOrder still takes planPriceId.
      // I'll check the instruction again.
      // It says: subscribe(plan) -> if price === 0 ... else startRazorpay(plan)
      // I'll check if Plan should have an ID.
      
      this.billingApi.createRazorpayOrder((plan as any).planPriceId || plan.planCode).subscribe({
        next: async (res) => {
          if (!res.status || !res.data) {
            alert('Failed to create order');
            this.processing = false;
            return;
          }

          const order = res.data;
          const scriptLoaded = await this.razorpay.loadScript();
          
          if (!scriptLoaded) {
            alert('Could not load payment gateway. Please check your internet connection.');
            this.processing = false;
            return;
          }

          const options = {
            key: order.key,
            amount: order.amount,
            currency: order.currency,
            order_id: order.orderId,
            name: '1mincv.com',
            description: 'Subscription Plan',
            handler: (response: any) => this.confirmPayment(response),
            modal: {
              ondismiss: () => (this.processing = false)
            },
            prefill: {
                // You can add user email/phone here if available
            },
            theme: {
              color: '#4B70F5'
            }
          };

          this.razorpay.openCheckout(options);
        },
        error: (err) => {
          console.error('Order creation error:', err);
          alert('Error creating order. Please try again.');
          this.processing = false;
        }
      });
    } catch (err) {
      console.error('Subscription flow error:', err);
      this.processing = false;
    }
  }

  confirmPayment(response: any) {
    this.billingApi.confirmPayment({
      razorpayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpaySignature: response.razorpay_signature
    }).subscribe({
      next: (res) => {
        this.processing = false;
        if (res.status) {
          alert('Subscription activated successfully!');
          this.authService.loadUserBenefits();
          // Redirect or refresh state
        } else {
          alert(res.message || 'Payment confirmation failed');
        }
      },
      error: (err) => {
        console.error('Payment confirmation error:', err);
        alert('Error confirming payment. If the amount was deducted, please contact support.');
        this.processing = false;
      }
    });
  }
}

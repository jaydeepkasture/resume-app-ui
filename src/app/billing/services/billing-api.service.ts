import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan, UserSubscription, PlanBenefit } from '../../models/billing.models';
import { HttpService } from '../../services/http.service';

@Injectable({ providedIn: 'root' })
export class BillingApiService {
  private baseUrl = 'billing';

  constructor(private http: HttpService) {}

  getPlans(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/plans`);
  }

  getPlansWithBenefits(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.baseUrl}/plans`);
  }

  getMySubscription(): Observable<UserSubscription> {
    return this.http.get<UserSubscription>(`${this.baseUrl}/subscription/me`);
  }

  getMyBenefits(): Observable<PlanBenefit> {
    return this.http.get<PlanBenefit>(`${this.baseUrl}/benefits/me`);
  }

  subscribeFree(planCode: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/subscribe/free`, { planCode });
  }

  createRazorpayOrder(planPriceId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/razorpay/order`, {
      planPriceId
    });
  }

  confirmPayment(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/subscription/confirm`, payload);
  }

  cancelSubscription(): Observable<any> {
    return this.http.post(`${this.baseUrl}/subscription/cancel`, {});
  }
}

import {
  HttpService
} from "./chunk-UE6KENAU.js";
import {
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-TRI43INR.js";

// src/app/billing/services/billing-api.service.ts
var BillingApiService = class _BillingApiService {
  constructor(http) {
    this.http = http;
    this.baseUrl = "billing";
  }
  getPlans() {
    return this.http.get(`${this.baseUrl}/plans`);
  }
  getPlansWithBenefits() {
    return this.http.get(`${this.baseUrl}/plans`);
  }
  getMySubscription() {
    return this.http.get(`${this.baseUrl}/subscription/me`);
  }
  getMyBenefits() {
    return this.http.get(`${this.baseUrl}/benefits/me`);
  }
  subscribeFree(planCode) {
    return this.http.post(`${this.baseUrl}/subscribe/free`, { planCode });
  }
  createRazorpayOrder(planPriceId) {
    return this.http.post(`${this.baseUrl}/razorpay/order`, {
      planPriceId
    });
  }
  confirmPayment(payload) {
    return this.http.post(`${this.baseUrl}/subscription/confirm`, payload);
  }
  cancelSubscription() {
    return this.http.post(`${this.baseUrl}/subscription/cancel`, {});
  }
  static {
    this.\u0275fac = function BillingApiService_Factory(t) {
      return new (t || _BillingApiService)(\u0275\u0275inject(HttpService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BillingApiService, factory: _BillingApiService.\u0275fac, providedIn: "root" });
  }
};

export {
  BillingApiService
};
//# sourceMappingURL=chunk-L2AZJT22.js.map

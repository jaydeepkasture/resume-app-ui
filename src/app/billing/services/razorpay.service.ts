import { Injectable } from '@angular/core';

declare var Razorpay: any;

@Injectable({ providedIn: 'root' })
export class RazorpayService {

  loadScript(): Promise<boolean> {
    return new Promise((resolve) => {
      // Check if already loaded
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      
      if (document.getElementById('razorpay-script')) {
        // Script is added but maybe not yet loaded, or loaded but Razorpay not on window yet
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        console.log('✅ Razorpay SDK loaded');
        resolve(true);
      };
      script.onerror = () => {
        console.error('❌ Failed to load Razorpay SDK');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  openCheckout(options: any) {
    if (!(window as any).Razorpay) {
      console.error('Razorpay SDK not loaded!');
      return;
    }
    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  }
}

import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  // Public Landing Page
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.component').then(m => m.LandingComponent)
  },
  
  // Public Legal and Information Pages
  {
    path: 'privacy-policy',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent)
  },
  {
    path: 'terms-of-service',
    loadComponent: () => import('./pages/terms-of-service/terms-of-service.component').then(m => m.TermsOfServiceComponent)
  },
  {
    path: 'refund-policy',
    loadComponent: () => import('./pages/refund-policy/refund-policy.component').then(m => m.RefundPolicyComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },

  // Template Gallery
  {
    path: 'templates',
    loadComponent: () => import('./template-gallery/template-gallery.component').then(m => m.TemplateGalleryComponent),
    canActivate: [AuthGuard]
  },
  
  // Authentication routes (public)
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  },
  
  // Protected routes (require authentication)
  {
    path: 'editor',
    loadComponent: () => import('./resume-editor/resume-editor.component').then(m => m.ResumeEditorComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'editor/:chatId',
    loadComponent: () => import('./resume-editor/resume-editor.component').then(m => m.ResumeEditorComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [AuthGuard]
  },
  
  // Billing and Subscription
  {
    path: 'billing/plans',
    loadComponent: () => import('./billing/pages/plans.component').then(m => m.PlansComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'billing/subscription',
    loadComponent: () => import('./billing/pages/subscription.component').then(m => m.SubscriptionComponent),
    canActivate: [AuthGuard]
  },
  
  // Wildcard route - redirect to editor (which will trigger login if not auth)
  {
    path: '**',
    redirectTo: '/editor'
  }
];

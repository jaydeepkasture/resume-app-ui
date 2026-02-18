import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  // Default route - redirect to resume templates
  {
    path: '',
    redirectTo: '/templates',
    pathMatch: 'full'
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
  
  {
    path: 'privacy-policy',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent)
  },
  {
    path: 'terms-of-service',
    loadComponent: () => import('./pages/terms-of-service/terms-of-service.component').then(m => m.TermsOfServiceComponent)
  },
  
  // Wildcard route - redirect to home
  {
    path: '**',
    redirectTo: '/editor'
  }
];

import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  // Default route - redirect to resume editor
  {
    path: '',
    redirectTo: '/editor',
    pathMatch: 'full'
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
  
  // Wildcard route - redirect to home
  {
    path: '**',
    redirectTo: '/editor'
  }
];

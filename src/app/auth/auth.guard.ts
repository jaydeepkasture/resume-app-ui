import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    console.log('🛡️ AuthGuard.canActivate called for:', state.url);
    const isAuth = this.authService.isAuthenticated();
    console.log('🛡️ isAuthenticated:', isAuth);
    
    if (isAuth) {
      console.log('✅ AuthGuard: User is authenticated, allowing access');
      return true;
    }

    // Not logged in, redirect to login page with return url
    console.log('❌ AuthGuard: User not authenticated, redirecting to login');
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

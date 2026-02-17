import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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
    
    // 1. Check if already authenticated (sync)
    if (this.authService.isAuthenticated()) {
      console.log('✅ AuthGuard: User is authenticated, allowing access');
      return true;
    }

    // 2. If not authenticated, try silent refresh (in case we have a cookie)
    console.log('🛡️ AuthGuard: Not authenticated, attempting silent refresh...');
    
    return this.authService.refreshToken().pipe(
      map(response => {
        if (response && response.status) {
          console.log('✅ AuthGuard: Silent refresh successful, allowing access');
          return true;
        } else {
          console.log('❌ AuthGuard: Silent refresh failed, redirecting to login');
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(err => {
        console.log('❌ AuthGuard: Error during silent refresh, redirecting to login', err);
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}

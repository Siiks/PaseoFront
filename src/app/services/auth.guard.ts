import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, from, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }
  isAuthenticated: boolean = false;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return from(this.authService.isAuthenticated()).pipe(
      switchMap((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          return from(this.authService.isAdmin());
        } else {
          localStorage.removeItem('access_token');
          localStorage.removeItem('email');
          localStorage.removeItem('roles');
          this.router.navigate(['/login']);
          return of(false);
        }
      }),
      switchMap((isAdmin: boolean) => {
        if (isAdmin) {
          return of(true);
        } else {
          this.router.navigate(['/login']);
          return of(false);
        }
      }),
      catchError((error: any) => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('email');
        localStorage.removeItem('roles');
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}

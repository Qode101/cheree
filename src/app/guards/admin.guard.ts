import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../app/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Check if the user has admin privileges
    if (this.authService.isAdmin()) {
      return true; // Allow access
    } else {
      // Redirect to login or unauthorized page if not an admin
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
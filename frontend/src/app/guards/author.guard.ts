import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authorGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); 
  const router = inject(Router);

  if (authService.isAuthenticated() && authService.getRole() === 'author') {
    return true;
  } else {
    router.navigate(['/login']); 
    return false;
  }
};

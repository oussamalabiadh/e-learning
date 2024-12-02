import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../serices/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  if (token) {
    const role = authService.getRole(); // Get the role from the token

    // Implement role-based access logic
    if (role === 'ADMIN' && state.url.startsWith('/admin')) {
      return true;
    } else if (role === 'INSTRUCTOR' && state.url.startsWith('/instructor')) {
      return true;
    } else if (role === 'USER' && state.url.startsWith('/user')) {
      return true;
    }
     // Redirect to login if not authenticated or unauthorized
  router.navigate(['/public']);
  return false;
  }

  // Redirect to login if not authenticated or unauthorized
  router.navigate(['/public/login']);
  return false;
};

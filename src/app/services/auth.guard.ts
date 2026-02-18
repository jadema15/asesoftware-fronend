import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/*export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

 const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};*/

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) return true;
  return router.createUrlTree(['/login']);
};

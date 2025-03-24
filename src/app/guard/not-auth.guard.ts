import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const notAuthGuard: CanActivateFn = (route, state) => {
    const platformId = inject(PLATFORM_ID);
    const router = inject(Router);


    if (isPlatformBrowser(platformId)) {
      const token = localStorage.getItem('token');
      if (!token) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    }else{
      return true;
    }
};

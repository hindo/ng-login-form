import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('AuthGuard');

    if (this.authService.isLogged()) {
      return true;
    }

    this.router.navigate(['/auth/login']);
    return false;
  }
}

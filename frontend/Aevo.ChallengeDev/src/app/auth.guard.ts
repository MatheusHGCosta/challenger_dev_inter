import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router,
    private alertCtrl: AlertService
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.alertCtrl.showError('ALERTAS.ERRO_AUTENTICAR')
      this.router.navigate(['/']);
      return false;
    }
  }
}

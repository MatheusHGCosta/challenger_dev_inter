import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,CommonModule, ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, CardModule,TranslateModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private translate : TranslateService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (suc) => {
          this.translate.setDefaultLang(suc.idioma);
          this.translate.use(suc.idioma);
          this.router.navigate(['/agendamentos'])
        },
        error: (err) => this.errorMessage = 'Erro ao fazer login. Verifique suas credenciais.'
      });
    }
  }
}

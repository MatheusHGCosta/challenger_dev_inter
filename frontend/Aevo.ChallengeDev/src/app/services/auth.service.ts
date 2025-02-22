import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:5185/usuarios';

  // Verifica se estamos no navegador antes de acessar sessionStorage
  private storage = typeof window !== 'undefined' ? sessionStorage : null;

  login(credentials: { email: string; password: string }): Observable<{ accessToken: string, idioma:string }> {
    return this.http.post<{ accessToken: string , idioma:string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        console.log(response)
        if (this.storage) {
          this.storage.setItem('token', response.accessToken);
        }

        return response;
      })
    );
  }

  getToken(): string | null {
    return this.storage ? this.storage.getItem('token') : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    if (this.storage) {
      this.storage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}

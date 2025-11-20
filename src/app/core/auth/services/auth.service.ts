import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";
import { UserToken } from '../../models/user-token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);

  // -----------------------------
  // الحالة الأساسية
  // -----------------------------
  isLogged = signal(false);

  constructor() {
    if (this.cookieService.check('token')) {
      this.isLogged.set(true);
    }
  }

  // Getter
  isLoggedIn(): boolean {
    return this.isLogged();
  }

  // -----------------------------
  // Login - Logout
  // -----------------------------
  registerForm(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + "auth/signup", data);
  }

  logInForm(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + "auth/signin", data);
  }

  logout(): void {
    this.cookieService.delete('token');
    this.isLogged.set(false);
    this.router.navigate(['/login']);
  }

  // -----------------------------
  // Token Decode
  // -----------------------------
  tokenDecode(): UserToken | null {
    try {
      const token = this.cookieService.get('token');
      return jwtDecode<UserToken>(token);
    } catch {
      this.logout();
      return null;
    }
  }

  // -----------------------------
  // Forgot / Reset
  // -----------------------------
  submitVerifyEmail(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `auth/forgotPasswords`, data);
  }

  submitVerifyCode(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `auth/verifyResetCode`, data);
  }

  submitResetPassword(data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `auth/resetPassword`, data);
  }
}

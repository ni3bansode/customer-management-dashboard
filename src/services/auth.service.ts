import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  login(formValues): boolean {
    if (
      formValues.email === 'test@example.com' &&
      formValues.password === 'password'
    ) {
      this.isAuthenticated = true;
      return true;
    } else {
      this.isAuthenticated = false;
      return false;
    }
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}

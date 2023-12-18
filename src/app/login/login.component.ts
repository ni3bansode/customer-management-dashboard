import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomersService } from '../customers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string;
  password: string;
  form: FormGroup;
  constructor(
    private authService: AuthService,
    private customerService: CustomersService,
    private router: Router,
    public fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    const isAuthenticated = this.authService.login(this.form.value);

    if (isAuthenticated) {
      this.customerService.setLogggedIn(true);
      this.router.navigate(['/all-customers']);
    } else {
      console.log('Login failed');
      this.customerService.setLogggedIn(false);
    }
  }
  getErrorMessage(controlName) {
    if (this.form.controls[controlName].hasError('required')) {
      return 'Required field';
    } else if (this.form.controls[controlName].hasError('email')) {
      return 'Not a valid email';
    } else if (this.form.controls[controlName].hasError('minlength')) {
      return 'Password should be 6 digit long';
    } else return 'Not a valid';
  }
}

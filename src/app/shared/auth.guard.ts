import { Injectable } from '@angular/core';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';
import { CustomersService } from '../customers.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private _customerService: CustomersService,
    private router: Router
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this._customerService.isLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    }
    // this._customerService.isLoggedIn();
    return true;
  }
}

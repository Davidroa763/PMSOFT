import { Injectable } from '@angular/core';
import { Router, CanActivate, } from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private storageService: AuthenticationService) { }

  canActivate() {
    console.log(this.storageService.isAuthenticated());
    if (this.storageService.isAuthenticated()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/home']);
    return false;
  }
}
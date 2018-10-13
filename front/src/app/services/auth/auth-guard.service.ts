import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService) {
    }

    canActivate() {
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.authService.logout();
            return false;
        }
    }
}
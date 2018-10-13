import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    constructor(private auth: AuthService) { }
}

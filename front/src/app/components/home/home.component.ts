import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/meus-contatos']);
    }
  }

  openDialog() {
    this.dialog.open(LoginDialogComponent, {
      height: '300px',
      width: '300px'
    });
  }

}

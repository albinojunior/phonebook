import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotifyService } from 'src/app/services/notify/notify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  sending: boolean;
  access_code: string;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private auth: AuthService,
    private notify: NotifyService,
    private router: Router
  ) { }

  login() {
    this.dialogRef.disableClose = true;
    this.sending = true;
    this.auth.login(this.access_code)
      .subscribe(user => {
        this.dialogRef.close();
        this.router.navigate(['/meus-contatos']);
        this.notify.show('success', `Bem vindo, ${user.name}`);
        this.sending = false;
      }, err => {
        console.log(err);
        this.sending = false;
      });
  }

}

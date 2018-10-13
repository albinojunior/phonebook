import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing } from './app.routing';
import {
  MatButtonModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatInputModule,
  MatPaginatorIntl
} from '@angular/material';

import { MatIconModule } from '@angular/material/icon';

import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogRef
} from '@angular/material/dialog';

import { MatGridListModule } from '@angular/material/grid-list';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { NotifierModule } from 'angular-notifier';

import { AppComponent } from './app.component';
import { TokenInterceptor } from './services/token.interceptor';
import { notifierDefaultOptions } from './configs/defaults.config';
import { HomeComponent } from './components/home/home.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { EditContactDialogComponent } from './components/edit-contact-dialog/edit-contact-dialog.component';
import { ContactComponent } from './components/contact/contact.component';
import { MatPaginatorIntlPtBr } from './configs/paginator.config';
import { HandlerErrorHelper } from './services/handler-error.helper';
import { FormBuilderValidators } from './validators/form-builder.validator';
import { DeleteContactDialogComponent } from './components/delete-contact-dialog/delete-contact-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactListComponent,
    NavbarComponent,
    LoginDialogComponent,
    EditContactDialogComponent,
    ContactComponent,
    DeleteContactDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    MatInputModule,
    NotifierModule.withConfig(notifierDefaultOptions),
  ],
  providers: [
    HandlerErrorHelper,
    FormBuilderValidators,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlPtBr },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginDialogComponent,
    EditContactDialogComponent,
    DeleteContactDialogComponent
  ]
})
export class AppModule { }

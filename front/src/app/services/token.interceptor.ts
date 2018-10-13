import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HandlerErrorHelper } from './handler-error.helper';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService, private handlerError: HandlerErrorHelper) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.getToken()}`
            }
        });

        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                if (event.body.error) { this.handlerError.handle(event); }
            }
        }, (error: any) => {
            if (error instanceof HttpErrorResponse) {
                this.handlerError.handle(error);
            }
        }));
    }
}

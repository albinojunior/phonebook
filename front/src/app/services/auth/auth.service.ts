import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { eraseCookie, getObjectCookie, getCookie } from '../../app.utils';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private router: Router, private http: HttpClient) { }

    public login(access_code: string): any {
        return new Observable((observer) => {
            this.http
                .post(`${environment.API_URL}/auth/login`, { access_code })
                .subscribe(
                    (res) => {
                        const token: string = JSON.stringify({ token: res, timeLogin: new Date().getTime() });
                        this.createTokenData(token);
                        this.getUserAuthenticated().subscribe(
                            (data) => {
                                const user = JSON.stringify(data);
                                this.createUserData(user);
                                observer.next(data);
                            },
                            (error: any) => {
                                observer.error(error.error);
                            });
                    },
                    (error) => {
                        observer.error(error);
                    });
        });

    }

    public getUserAuthenticated(): Observable<any> {
        return this.http.get(`${environment.API_URL}/auth/user`);
    }

    private createUserData(user: string): void {
        eraseCookie('auth_user_data');
        document.cookie = `auth_user_data=${user};Max-Age=21600`;
    }

    private createTokenData(token: string): void {

        eraseCookie('auth_token');

        const objToken: any = JSON.parse(token);
        const expires: number = (_.isObject(objToken)) ? objToken.token.expires_in : 21600;

        document.cookie = `auth_token=${token};Max-Age=${expires}`;
    }

    getToken(): any {
        const jsonData: any = getObjectCookie('auth_token');

        if (_.isEmpty(jsonData) && !_.isObject(jsonData)) {
            eraseCookie('auth_token');
            this.router.navigate(['/']);

        } else {
            return jsonData.token.access_token;
        }
    }

    getDataUser(): any {

        const jsonData: any = getObjectCookie('auth_user_data');

        if (_.isEmpty(jsonData) && !_.isObject(jsonData)) {
            eraseCookie('auth_user_data');
            this.router.navigate(['/']);
        }
        return jsonData;
    }

    public isLoggedIn(): boolean {
        moment.locale('pt-br');

        const tokenString: string = getCookie('auth_token') || '{}';
        const userString: string = getCookie('auth_user_data') || '{}';
        const token: any = JSON.parse(tokenString);
        const user: any = JSON.parse(userString);
        let result: boolean;
        try {
            if ((token && token.token && token.token.access_token) && (user && user._id)) {
                const timeExpire = moment(parseInt(token.timeLogin, 10)).add(parseInt(token.token.expires_in, 10), 'seconds');
                const isTokenExpired = timeExpire.isBefore(moment());
                result = token.token.access_token != null && !isTokenExpired;
            }
        } catch (error) {
            result = false;
        }

        return result;
    }

    logout(): void {
        eraseCookie('auth_token');
        eraseCookie('auth_user_data');
        this.router.navigate(['/']);
    }

}

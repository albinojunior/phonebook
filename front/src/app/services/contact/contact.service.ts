import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(private router: Router, private http: HttpClient) { }

    public getAll(options: any): Observable<any> {
        const query = this.buildQueryParams(options);
        return this.http.get(`${environment.API_URL}/contacts${query}`);
    }

    public create(data: any): Observable<any> {
        return this.http.post(`${environment.API_URL}/contacts`, data);
    }

    public update(data: any): Observable<any> {
        return this.http.put(`${environment.API_URL}/contacts/${data.id}`, data);
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${environment.API_URL}/contacts/${id}`);
    }

    private buildQueryParams(params: object): string {
        let query = '';
        Object.keys(params)
            .forEach((value) => {
                if (query.length === 0) {
                    query += `?${value}=${params[value]}`;
                } else {
                    query += `&${value}=${params[value]}`;
                }
            });
        return query;
    }
}

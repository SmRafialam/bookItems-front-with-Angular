import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, tap } from 'rxjs';
import { loginPayload, registerPayload } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) { }

  login(payload: loginPayload): Observable<any> {
    console.log(payload);
    return this.http.post(`${this.apiUrl}/login`, payload)
      .pipe(
        tap((response: any) => {
          // If login is successful, store the JWT token in local storage
          localStorage.setItem('token', response.token);
        })
      );
  }

  register(payload: registerPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, payload);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); 
  }

  // logout(): void {
  //   localStorage.removeItem('token');
  // }
  
  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('token'); 
  // }
  
  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }
}

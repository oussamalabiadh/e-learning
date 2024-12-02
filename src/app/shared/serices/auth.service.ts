import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) { }

  register(user: any): Observable<any> {
    return this._HttpClient.post('http://localhost:8080/api/v1/user/register', user);
  }

  login(user: any): Observable<any> {
    return this._HttpClient.post('http://localhost:8080/api/v1/user/login', user).pipe(
      tap((response: any) => {
        if (response.status && response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  resetPassword(userMail: any): Observable<any> {
    return this._HttpClient.post('http://localhost:8080/api/v1/user/reset-password', userMail);
  }

  updatePassword(UpdatePasswordDTO: any, email: string): Observable<any> {
    const params = { email: email };
    return this._HttpClient.post('http://localhost:8080/api/v1/user/update-password', UpdatePasswordDTO, { params });
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
    console.log(token);
    
  }

  private decodeToken(): any {
    const token = this.getToken();
    try {      
      return token ? jwtDecode(token) : null;
    } catch (Error) {
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getRole(): string | null {
    const decodedToken = this.decodeToken();
    return decodedToken ? decodedToken.role : null;
  }
  getUserInfo(): any {
    return this.decodeToken();
  }
}

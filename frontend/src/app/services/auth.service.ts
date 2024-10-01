import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Replace with your actual API URL
  private auth: boolean = false;
  private bearerToken: string = '0';
  constructor(private http: HttpClient) {}
  

  isAuthenticated(): boolean {
    if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('user');
      return !!user; 
    }
    return false;  
  }

  getRole(): string {
    if (typeof localStorage !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.role;
    }
    return '';  
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`).pipe(
      tap(user => {
        console.log('Fetched user:', user);
      })
    );
  }
  public setAuth(auth: boolean){
    this.auth  = auth;
    localStorage.setItem('auth', ''+auth);
  }
  public setBearerToken(bearerToken: string){
    this.bearerToken  = bearerToken;
    localStorage.setItem('bearerToken', bearerToken);
  }
  listBooks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list-books`);
  }
}

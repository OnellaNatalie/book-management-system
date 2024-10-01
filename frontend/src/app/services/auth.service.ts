import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Replace with your actual API URL
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();
  constructor(private http: HttpClient) {}
  

  isAuthenticated(): boolean {
    const user = localStorage.getItem('user');
    return !!user; 
  }

  getRole(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

  setLoggedIn(status: boolean) {
    this.loggedIn.next(status);
  }
}

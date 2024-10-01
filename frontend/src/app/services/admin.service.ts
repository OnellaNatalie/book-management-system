import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://127.0.0.1:8000/api/admin';  

  constructor(private http: HttpClient) {}

   
  listAuthors(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/authors`, { headers });
  }
 
  updateAuthorStatus(authorId: number, status: string): Observable<any> {
    // console.log(authorId,status)
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.patch(`${this.apiUrl}/authors/status/${authorId}`,{ status },{ headers});
  }

  
  listBooks(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/list-books`,{ headers });
  }

 
  listBooksByAuthor(authorId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/authors/books/${authorId}`, { headers });
  }
}

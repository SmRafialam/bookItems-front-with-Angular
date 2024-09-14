import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = 'http://localhost:3000/books';

  constructor(private http:HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      retry(2), 
      catchError(this.handleError) 
    );  
  }

  createBook(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data).pipe(
      retry(2), 
      catchError(this.handleError)
    );  
  }

  getBook(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      retry(2),
      catchError(this.handleError)
    );  
  }

  updateBook(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, data).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      retry(2),
      catchError(this.handleError)
    );  
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);

    return throwError(errorMessage);
  }
}

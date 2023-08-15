import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../Models/Book';
import configurl from '../../assets/config/config.json'

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url = configurl.apiServer.url + '/api/books/';

  constructor(private http: HttpClient) { }

  // Fetch the list of books
  getBookList(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url);
  }

  // Fetch details of a single book
  getOneBook(bookId: string): Observable<Book> {
    return this.http.get<Book>(this.url + bookId);
  }
  
  // Add a new book
  postBookData(bookData: Book): Observable<any> {
    const httpHeaders = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    const jsonData = JSON.stringify(bookData);
    return this.http.post<any>(this.url, jsonData, httpHeaders);
  }

  // Update a book
  updateBook(bookId: string, bookData: Book): Observable<Book> {
    const httpHeaders = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    const jsonData = JSON.stringify(bookData);
    return this.http.put<Book>(this.url + bookId, jsonData, httpHeaders);
  }
  
  // Partially update a book using JSON patch (Not done)
  patchBook(bookId: string, bookData: any): Observable<any> {
    const httpHeaders = { headers: new HttpHeaders({'Content-Type': 'application/json-patch+json'}) };
    return this.http.patch(this.url + bookId, [bookData], httpHeaders);
  }
  
  // Delete a book by ID
  deleteBookById(id: string): Observable<string> {
    return this.http.delete<string>(this.url + id);
  }

  // Fetch details of a book by ID
  getBookDetailsById(bookId: string): Observable<Book> {
    return this.http.get<Book>(this.url + bookId);
  }
}
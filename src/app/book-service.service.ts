import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './Models/Book';
import configurl from '../assets/config/config.json'

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url = configurl.apiServer.url + '/api/books/';
  constructor(private http: HttpClient) { }

  getBookList(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url);
  }

  getOneBook(bookId: string): Observable<Book> {
    return this.http.get<Book>(this.url + bookId);
  }
  
  //
  postBookData(bookData: Book): Observable<any> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    const jsonData = JSON.stringify(bookData);
    return this.http.post<any>(this.url, jsonData, httpHeaders);
  }

  //
  updateBook(bookId: string, bookData: Book): Observable<Book> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    const jsonData = JSON.stringify(bookData);
    return this.http.put<Book>(this.url + bookId, jsonData, httpHeaders);
  }
  
  //
  patchBook(bookId: string, bookData: any): Observable<any> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json-patch+json'}) };
    return this.http.patch(this.url + bookId, [bookData], httpHeaders);
  }
  
  //
  deleteBookById(id: string): Observable<string> {
    return this.http.delete<string>(this.url + id);
  }

  //
  getBookDetailsById(bookId: string): Observable<Book> {
    return this.http.get<Book>(this.url + bookId);
  }
}

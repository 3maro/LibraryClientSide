import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote } from '../Models/Quote';
import configurl from '../../assets/config/config.json';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  url = configurl.apiServer.url + '/api/quotes';

  constructor(private http: HttpClient) { }

  getQuoteList(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.url);
  }
}
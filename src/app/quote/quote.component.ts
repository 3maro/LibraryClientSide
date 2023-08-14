import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from '../Models/Quote';
import { QuoteService } from '../Services/quote.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  quoteList?: Observable<Quote[]>;

  constructor(private quoteService: QuoteService) { }

  ngOnInit(): void {
    this.getQuoteList();
  }

  getQuoteList(): void {
    this.quoteList = this.quoteService.getQuoteList();
  }
}
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

  // Initialize component
  ngOnInit(): void {
    this.getQuoteList();
  }

  // Fetch the list of quotes
  getQuoteList(): void {
    this.quoteList = this.quoteService.getQuoteList();
  }
}

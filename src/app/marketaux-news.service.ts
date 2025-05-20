import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketauxNewsService {
  private apiKey = environment.marketauxApiKey;

  constructor(private http: HttpClient) {}

  getFinanceNews(): Observable<any> {
    const url = `https://api.marketaux.com/v1/news/all?filter_entities=true&language=en&limit=10&api_token=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  getSymbolNews(): Observable<any> {
    const url = `https://api.marketaux.com/v1/news/all?symbols=TSLA,AMZN,MSFT&filter_entities=true&language=en&api_token=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}

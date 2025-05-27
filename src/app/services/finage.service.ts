import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinageService {
  private apiKey = environment.finageApiKey;

  constructor(private http: HttpClient) {}

  // Get the quote for a stock (e.g., AAPL)
  getStockQuote(symbol: string): Observable<any> {
    const url = `https://api.finage.co.uk/last/stock/${symbol}?apikey=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  // Get the quote for a cryptocurrency (e.g., BTCUSD)
  getCryptoQuote(symbol: string): Observable<any> {
    const url = `https://api.finage.co.uk/last/crypto/${symbol}?apikey=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}

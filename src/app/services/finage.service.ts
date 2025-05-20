import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinageService {
  private apiKey = environment.finageApiKey; // Sostituisci con la tua API key

  constructor(private http: HttpClient) {}

  // Ottieni la quotazione di una stock (es: AAPL)
  getStockQuote(symbol: string): Observable<any> {
    const url = `https://api.finage.co.uk/last/stock/${symbol}?apikey=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}

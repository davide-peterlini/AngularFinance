import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinageService } from '../services/finage.service';
import { Subscription, interval } from 'rxjs';

interface StockData {
  symbol: string;
  price: number | null;
  loading: boolean;
}

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pt-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100">
      <h2 class="text-4xl font-black mb-10 text-center text-purple-700 tracking-tight drop-shadow">Live Stocks Data</h2>
      <div class="flex flex-wrap gap-8 justify-center">
        <div *ngFor="let stock of stocks"
             class="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl w-64 flex flex-col items-center p-7 border-t-4 border-purple-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
          <div class="flex items-center gap-2 mb-3">
            <span class="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-purple-400 to-blue-400"></span>
            <span class="text-xl font-bold text-purple-700 tracking-wide">{{ stock.symbol }}</span>
          </div>
          <div *ngIf="stock.loading" class="text-gray-400 text-lg animate-pulse">Loading...</div>
          <div *ngIf="!stock.loading" class="text-4xl font-extrabold text-blue-900 mb-2">
            {{ stock.price !== null ? ('$' + stock.price) : 'N/A' }}
          </div>
        </div>
      </div>
    </div>
  `
})
export class StocksComponent implements OnInit, OnDestroy {
  stockSymbols = [
    'AAPL',  // Apple
    'MSFT',  // Microsoft
    'GOOGL', // Alphabet (Google)
    'AMZN',  // Amazon
    'TSLA',  // Tesla
    'META',  // Meta Platforms (Facebook)
    'NVDA',  // Nvidia
    'NFLX',  // Netflix
    'AMD',   // Advanced Micro Devices
    'INTC',  // Intel
    'DIS',   // Walt Disney
    'V',     // Visa
    'JPM',   // JPMorgan Chase
    'WMT',   // Walmart
    'PEP'    // PepsiCo
  ];
  stocks: StockData[] = [];
  private intervalSub?: Subscription;

  constructor(private finage: FinageService) {}

  ngOnInit() {
    this.stocks = this.stockSymbols.map(symbol => ({
      symbol,
      price: null,
      loading: true
    }));
    this.fetchAll();
    this.intervalSub = interval(100000).subscribe(() => this.fetchAll());
  }

  fetchAll() {
    this.stocks.forEach(stock => {
      stock.loading = true;
      this.finage.getStockQuote(stock.symbol).subscribe({
        next: (data) => {
          stock.price = data.ask ?? null;
          stock.loading = false;
        },
        error: () => {
          stock.price = null;
          stock.loading = false;
        }
      });
    });
  }

  ngOnDestroy() {
    this.intervalSub?.unsubscribe();
  }
}

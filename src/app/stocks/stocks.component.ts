import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinageService } from '../services/finage.service';
import { Subscription, interval } from 'rxjs';
import { AssetListComponent } from '../shared/asset-list.component';

interface StockData {
  symbol: string;
  price: number | null;
  loading: boolean;
}

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule, AssetListComponent],
  template: `
    <div class="pt-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100">
      <h2 class="text-4xl font-black mb-10 text-center text-purple-700 tracking-tight drop-shadow">Live Stocks Data</h2>
      <app-asset-list [assets]="stocks" type="stock"></app-asset-list>
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

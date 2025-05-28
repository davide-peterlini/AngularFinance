import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinageService } from '../../services/finage.service';
import { Subscription, interval } from 'rxjs';
import { AssetListComponent } from '../shared/asset-list.component';

// Interface for crypto data
interface CryptoData {
  symbol: string;
  price: number | null;
  loading: boolean;
}

@Component({
  selector: 'app-crypto',
  standalone: true,
  imports: [CommonModule, AssetListComponent],
  template: `
    <div class="pt-12 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100">
      <h2 class="text-4xl font-black mb-10 text-center text-purple-700 tracking-tight drop-shadow">Live Crypto Data</h2>
      <app-asset-list [assets]="cryptos" type="crypto"></app-asset-list>
    </div>
  `
})
export class CryptoComponent implements OnInit, OnDestroy {
  // List of crypto symbols to display
  cryptoSymbols = [
    'BTCUSD', // Bitcoin
    'ETHUSD', // Ethereum
    'BNBUSD', // Binance Coin
    'SOLUSD', // Solana
    'ADAUSD', // Cardano
    'XRPUSD', // Ripple
    'DOGEUSD', // Dogecoin
    'AVAXUSD', // Avalanche
    'MATICUSD', // Polygon
    'DOTUSD'   // Polkadot
  ];
  cryptos: CryptoData[] = [];
  private intervalSub?: Subscription;

  constructor(private finage: FinageService) {}

  ngOnInit() {
    // Initialize cryptos array with loading state
    this.cryptos = this.cryptoSymbols.map(symbol => ({
      symbol,
      price: null,
      loading: true
    }));
    this.fetchAll();
    // Refresh data every 100 seconds
    this.intervalSub = interval(100000).subscribe(() => this.fetchAll());
  }

  // Fetch latest quotes for all cryptos
  fetchAll() {
    this.cryptos.forEach(crypto => {
      crypto.loading = true;
      this.finage.getCryptoQuote(crypto.symbol).subscribe({
        next: (data) => {
          crypto.price = data.price ?? null;
          crypto.loading = false;
        },
        error: () => {
          crypto.price = null;
          crypto.loading = false;
        }
      });
    });
  }

  ngOnDestroy() {
    // Clean up the interval subscription
    this.intervalSub?.unsubscribe();
  }
}

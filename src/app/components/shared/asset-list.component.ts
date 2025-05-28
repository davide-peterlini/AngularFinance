import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interface for asset data (stock or crypto)
interface AssetData {
  symbol: string;
  price: number | null;
  loading: boolean;
}

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-wrap gap-8 justify-center">
      <div *ngFor="let asset of assets"
           class="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl w-64 flex flex-col items-center p-7 border-t-4"
           [ngClass]="type === 'stock' ? 'border-purple-400' : 'border-blue-400'">
        <div class="flex items-center gap-2 mb-3">
          <span class="inline-block w-3 h-3 rounded-full"
                [ngClass]="type === 'stock' ? 'bg-gradient-to-br from-purple-400 to-blue-400' : 'bg-gradient-to-br from-blue-400 to-purple-400'"></span>
          <span class="text-xl font-bold"
                [ngClass]="type === 'stock' ? 'text-purple-700' : 'text-blue-700'">
            {{ asset.symbol }}
          </span>
        </div>
        <div *ngIf="asset.loading" class="text-gray-400 text-lg animate-pulse">Loading...</div>
        <div *ngIf="!asset.loading" class="text-4xl font-extrabold text-blue-900 mb-2">
          {{ asset.price !== null ? ('$' + asset.price) : 'N/A' }}
        </div>
      </div>
    </div>
  `
})
export class AssetListComponent {
  // List of assets to render (stocks or cryptos)
  @Input() assets: AssetData[] = [];
  // Type of asset for styling ('stock' or 'crypto')
  @Input() type: 'stock' | 'crypto' = 'stock';
}

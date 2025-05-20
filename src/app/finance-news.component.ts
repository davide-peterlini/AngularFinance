import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketauxNewsService } from './marketaux-news.service';

@Component({
  selector: 'app-finance-news',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pt-12">
      <h2 class="text-4xl font-black mb-10 text-center text-blue-700 tracking-tight drop-shadow">Latest Finance News</h2>
      <div class="mt-8 flex flex-wrap gap-8 justify-center">
        <div *ngFor="let article of articles"
             class="bg-white rounded-2xl shadow-lg w-80 flex flex-col overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-gray-100">
          <img *ngIf="article.image_url"
               [src]="article.image_url"
               alt="Article cover"
               class="h-48 w-full object-cover">
          <div class="p-5 flex flex-col flex-1">
            <h3 class="text-lg font-bold mb-2 text-gray-900 line-clamp-2">{{ article.title }}</h3>
            <p class="text-gray-600 text-base mb-4 line-clamp-3">{{ article.description }}</p>
            <span class="text-xs text-gray-400 mb-2">{{ article.published_at | date:'medium' }}</span>
            <a [href]="article.url"
               target="_blank"
               rel="noopener"
               class="mt-auto inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors text-center font-medium">
              Read more
            </a>
          </div>
        </div>
      </div>

      <h2 class="text-3xl font-black mt-16 mb-10 text-center text-green-700 tracking-tight drop-shadow">TSLA, AMZN, MSFT News</h2>
      <div class="mt-8 flex flex-wrap gap-8 justify-center">
        <div *ngFor="let article of symbolArticles"
             class="bg-white rounded-2xl shadow-lg w-80 flex flex-col overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-gray-100">
          <img *ngIf="article.image_url"
               [src]="article.image_url"
               alt="Article cover"
               class="h-48 w-full object-cover">
          <div class="p-5 flex flex-col flex-1">
            <h3 class="text-lg font-bold mb-2 text-gray-900 line-clamp-2">{{ article.title }}</h3>
            <p class="text-gray-600 text-base mb-4 line-clamp-3">{{ article.description }}</p>
            <span class="text-xs text-gray-400 mb-2">{{ article.published_at | date:'medium' }}</span>
            <a [href]="article.url"
               target="_blank"
               rel="noopener"
               class="mt-auto inline-block px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors text-center font-medium">
              Read more
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FinanceNewsComponent implements OnInit {
  articles: any[] = [];
  symbolArticles: any[] = [];

  constructor(private newsService: MarketauxNewsService) {}

  ngOnInit() {
    this.newsService.getFinanceNews().subscribe(data => {
      this.articles = data.data;
    });
    this.newsService.getSymbolNews().subscribe(data => {
      this.symbolArticles = data.data;
    });
  }
}

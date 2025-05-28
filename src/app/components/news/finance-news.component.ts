import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketauxNewsService } from '../../services/marketaux-news.service';

// Configuration for each news block section
interface NewsBlockConfig {
  title: string;
  color: string;
  articlesKey: keyof FinanceNewsComponent;
  loadingKey: keyof FinanceNewsComponent['loading'];
}

@Component({
  selector: 'app-finance-news',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pt-12">
      <!-- Button to open favorites modal -->
      <button
        (click)="showFavorites = true"
        class="fixed top-6 right-6 z-50 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
        title="Show favorite news"
      >
        &#9733;
      </button>

      <!-- Render each news block (latest, symbol, positive, negative) -->
      <ng-container *ngFor="let block of newsBlocks">
        <h2 class="text-3xl font-black mb-10 mt-16 text-center"
            [ngClass]="block.color + ' tracking-tight drop-shadow'">
          {{ block.title }}
        </h2>
        <div class="mt-8 flex flex-wrap gap-8 justify-center">
          <ng-container *ngIf="!loading[block.loadingKey]; else skeleton">
            <div *ngFor="let article of getArticles(block.articlesKey)"
                 class="bg-white rounded-2xl shadow-lg w-80 flex flex-col overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <img *ngIf="article.image_url"
                   [src]="article.image_url"
                   alt="Article cover"
                   class="h-48 w-full object-cover"
                   (error)="onImgError($event)">
              <div class="p-5 flex flex-col flex-1">
                <h3 class="text-lg font-bold mb-2 text-gray-900 line-clamp-2">{{ article.title }}</h3>
                <p class="text-gray-600 text-base mb-4 line-clamp-3">{{ article.description }}</p>
                <span class="text-xs text-gray-400 mb-2">{{ article.published_at | date:'medium' }}</span>
                <div class="flex items-center mb-2">
                  <!-- Favorite/unfavorite buttons -->
                  <button
                    *ngIf="!isFavorite(article)"
                    (click)="addToFavorites(article)"
                    class="mr-2 text-yellow-500 hover:text-yellow-600"
                    title="Add to favorites"
                  >&#9734; Favorite</button>
                  <button
                    *ngIf="isFavorite(article)"
                    (click)="removeFromFavorites(article)"
                    class="mr-2 text-yellow-600 font-bold"
                    title="Remove from favorites"
                  >&#9733; Favorited</button>
                </div>
                <a [href]="article.url"
                   target="_blank"
                   rel="noopener"
                   class="mt-auto inline-block px-4 py-2 rounded-lg shadow transition-colors text-center font-medium"
                   [ngClass]="{
                     'bg-blue-600 text-white hover:bg-blue-700': block.color.includes('blue'),
                     'bg-green-600 text-white hover:bg-green-700': block.color.includes('green'),
                     'bg-pink-600 text-white hover:bg-pink-700': block.color.includes('pink'),
                     'bg-red-600 text-white hover:bg-red-700': block.color.includes('red')
                   }">
                  Read more
                </a>
              </div>
            </div>
          </ng-container>
          <!-- Skeleton loader while loading -->
          <ng-template #skeleton>
            <div *ngFor="let n of skeletonArray" class="bg-gray-100 animate-pulse rounded-2xl shadow-lg w-80 flex flex-col overflow-hidden border border-gray-100">
              <div class="h-48 w-full bg-gray-200"></div>
              <div class="p-5 flex flex-col flex-1">
                <div class="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div class="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                <div class="h-4 bg-gray-200 rounded mb-4 w-5/6"></div>
                <div class="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                <div class="h-8 bg-gray-300 rounded w-1/2 mt-auto"></div>
              </div>
            </div>
          </ng-template>
        </div>
      </ng-container>

      <!-- Favorites modal -->
      <div
        *ngIf="showFavorites"
        class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-2xl shadow-2xl w-[90vw] max-w-3xl max-h-[90vh] overflow-y-auto p-8 relative">
          <button
            (click)="showFavorites = false"
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            title="Close"
          >&times;</button>
          <h2 class="text-2xl font-bold mb-6 text-yellow-600">Favorite News</h2>
          <div *ngIf="favorites.length > 0; else noFav">
            <div *ngFor="let article of favorites" class="mb-8 border-b pb-6 last:border-b-0 last:pb-0">
              <h3 class="font-semibold text-lg mb-2">{{ article.title }}</h3>
              <p class="text-gray-600 mb-2">{{ article.description }}</p>
              <span class="text-xs text-gray-400 mb-2 block">{{ article.published_at | date:'medium' }}</span>
              <a [href]="article.url" target="_blank" rel="noopener" class="text-blue-600 hover:underline">Read more</a>
              <button
                (click)="removeFromFavorites(article)"
                class="ml-4 text-yellow-600 font-bold"
                title="Remove from favorites"
              >&#9733; Remove</button>
            </div>
          </div>
          <ng-template #noFav>
            <div class="text-center text-gray-400 mb-8">No favorite news yet.</div>
          </ng-template>
        </div>
      </div>
    </div>
  `
})
export class FinanceNewsComponent implements OnInit {
  articles: any[] = [];
  symbolArticles: any[] = [];
  positiveArticles: any[] = [];
  negativeArticles: any[] = [];

  // Loading state for each news block
  loading = {
    articles: true,
    symbolArticles: true,
    positiveArticles: true,
    negativeArticles: true
  };

  skeletonArray = Array(3);

  // Configuration for each news block
  newsBlocks: NewsBlockConfig[] = [
    {
      title: 'Latest Finance News',
      color: 'text-blue-700',
      articlesKey: 'articles',
      loadingKey: 'articles'
    },
    {
      title: 'TSLA, AMZN, MSFT News',
      color: 'text-green-700',
      articlesKey: 'symbolArticles',
      loadingKey: 'symbolArticles'
    },
    {
      title: 'Positive Sentiment News',
      color: 'text-pink-700',
      articlesKey: 'positiveArticles',
      loadingKey: 'positiveArticles'
    },
    {
      title: 'Negative Sentiment News',
      color: 'text-red-700',
      articlesKey: 'negativeArticles',
      loadingKey: 'negativeArticles'
    }
  ];

  favorites: any[] = [];
  showFavorites = false;

  constructor(private newsService: MarketauxNewsService) {}

  // Returns the correct articles array based on the key
  getArticles(key: keyof FinanceNewsComponent): any[] {
    switch (key) {
      case 'articles':
        return this.articles;
      case 'symbolArticles':
        return this.symbolArticles;
      case 'positiveArticles':
        return this.positiveArticles;
      case 'negativeArticles':
        return this.negativeArticles;
      default:
        return [];
    }
  }

  ngOnInit() {
    this.loadFavorites();
    // Fetch news for each block
    this.newsService.getFinanceNews().subscribe(data => {
      this.articles = data.data;
      this.loading.articles = false;
    });
    this.newsService.getSymbolNews().subscribe(data => {
      this.symbolArticles = data.data;
      this.loading.symbolArticles = false;
    });
    this.newsService.getPositiveSentimentNews().subscribe(data => {
      this.positiveArticles = data.data;
      this.loading.positiveArticles = false;
    });
    this.newsService.getNegativeSentimentNews().subscribe(data => {
      this.negativeArticles = data.data;
      this.loading.negativeArticles = false;
    });
  }

  // Add an article to favorites if not already present
  addToFavorites(article: any) {
    if (!this.favorites.find(a => a.url === article.url)) {
      this.favorites.push(article);
      this.saveFavorites();
    }
  }

  // Remove an article from favorites
  removeFromFavorites(article: any) {
    this.favorites = this.favorites.filter(a => a.url !== article.url);
    this.saveFavorites();
  }

  // Check if an article is in favorites
  isFavorite(article: any): boolean {
    return this.favorites.some(a => a.url === article.url);
  }

  // Persist favorites to localStorage
  saveFavorites() {
    localStorage.setItem('favoriteNews', JSON.stringify(this.favorites));
  }

  // Load favorites from localStorage
  loadFavorites() {
    const fav = localStorage.getItem('favoriteNews');
    this.favorites = fav ? JSON.parse(fav) : [];
  }

  // Set a default image if the article cover fails to load
  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
  }
}

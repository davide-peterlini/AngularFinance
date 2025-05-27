import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { FinanceNewsComponent } from './app/news/finance-news.component';
import { StocksComponent } from './app/stocks/stocks.component';
import { CryptoComponent } from './app/crypto/crypto.component';

const routes: Routes = [
  { path: '', component: FinanceNewsComponent },
  { path: 'stocks', component: StocksComponent },
  { path: 'crypto', component: CryptoComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});

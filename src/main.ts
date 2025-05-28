import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { FinanceNewsComponent } from './app/components/news/finance-news.component';
import { StocksComponent } from './app/components/stocks/stocks.component';
import { CryptoComponent } from './app/components/crypto/crypto.component';

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

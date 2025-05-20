import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { FinanceNewsComponent } from './app/news/finance-news.component';
import { StocksComponent } from './app/stocks/stocks.component';

const routes: Routes = [
  { path: '', component: FinanceNewsComponent },
  { path: 'stocks', component: StocksComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});

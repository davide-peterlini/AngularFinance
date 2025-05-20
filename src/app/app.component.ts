import { Component } from '@angular/core';
import { FinanceNewsComponent } from './news/finance-news.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [FinanceNewsComponent, HeaderComponent]
})
export class AppComponent {}

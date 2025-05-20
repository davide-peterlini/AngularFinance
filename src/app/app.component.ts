import { Component } from '@angular/core';
import { FinanceNewsComponent } from './finance-news.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [FinanceNewsComponent]
})
export class AppComponent {}

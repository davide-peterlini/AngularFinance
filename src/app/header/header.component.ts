import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="w-full bg-blue-700 py-6 shadow-lg mb-8">
      <div class="container mx-auto flex flex-col items-center">
        <h1 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow mb-2">
          Finance News Portal
        </h1>
        <p class="text-blue-100 text-base md:text-lg font-medium">
          Stay updated with the latest financial news and stock insights
        </p>
      </div>
    </header>
  `
})
export class HeaderComponent {}

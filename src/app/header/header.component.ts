import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="w-full bg-blue-700 py-6 shadow-lg mb-8">
      <div class="container mx-auto flex flex-col items-center">
        <h1 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow mb-2">
          Finance News Portal
        </h1>
        <p class="text-blue-100 text-base md:text-lg font-medium mb-4">
          Stay updated with the latest financial news and stock insights
        </p>
        <nav class="flex gap-6">
          <a routerLink="/" routerLinkActive="font-bold" class="text-white hover:text-blue-200 transition">Home</a>
          <a routerLink="/stocks" routerLinkActive="font-bold underline" class="text-white hover:text-blue-200 transition">Stocks</a>
          <a routerLink="/crypto" routerLinkActive="font-bold underline" class="text-white hover:text-blue-200 transition">Crypto</a>
        </nav>
      </div>
    </header>
  `
})
export class HeaderComponent {}

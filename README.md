# AngularFinance

## Overview

**AngularFinance** is a web application built with Angular that allows users to view real-time stock and cryptocurrency quotes, as well as the latest financial news. Users can also save their favorite news articles for quick access at any time.

## Purpose

The purpose of this project is to provide a simple and modern dashboard for monitoring financial markets, including:
- Real-time stock and crypto prices (via Finage API)
- Latest finance news (via Marketaux API)
- Ability to save and view favorite news articles

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)

### Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/davide-peterlini/AngularFinance.git
    cd angular-finance
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure your API keys in `src/environments/environment.ts`:
    ```typescript
    export const environment = {
      finageApiKey: 'YOUR_FINAGE_API_KEY',
      marketauxApiKey: 'YOUR_MARKETAUX_API_KEY'
    };
    ```

### Running the Application

Start the development server:
```bash
ng serve
```
Then open your browser at [http://localhost:4200/](http://localhost:4200/).

### Usage

- Browse live stock and crypto prices.
- Read the latest finance news.
- Click the star icon to add news articles to your favorites.
- Access your favorite news at any time via the dedicated section or modal.

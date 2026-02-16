# Makkalurimai Publications — Online Bookstore

A high-performance, lightweight, and visually premium online bookstore built with Astro 5 and React islands.

## Features

- **SSG-Driven Performance**: 100% static site generation for all books and authors.
- **Monorepo Architecture**: Shared database layer in `/packages/db`.
- **Editorial Design**: "Paper & Ink" theme with premium serif typography (Libre Baskerville).
- **Comprehensive Catalog**: Home, Books Listing, Category Filtering, and Author Profiles.
- **Tech Stack**: Astro 5, Tailwind CSS v4, React, Drizzle ORM, Neon Postgres.

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321) to see the result.

### Build & Preview

```bash
npm run build
npm run preview
```

### Database

Seeding the database:
```bash
npm run seed
```

## Project Structure

- `/astro-app`: The main bookstore application.
- `/packages/db`: Shared Drizzle schema and query helpers.
- `/scripts`: Utility scripts (seeding, etc).

## License

© 2024 Makkalurimai Publications. All rights reserved.

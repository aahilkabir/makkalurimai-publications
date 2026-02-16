// Shared DB client & query helpers.
// Used by both Next.js and Astro apps at build time.

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq, desc } from 'drizzle-orm';
import * as schema from './schema';

// Re-export schema for convenience
export * from './schema';
export { eq, desc } from 'drizzle-orm';

// --- Connection ---
const connectionString = process.env.DATABASE_URL || '';
if (!connectionString) {
    console.warn('⚠️  DATABASE_URL is not set.');
}
const sql = postgres(connectionString, { max: 1 });
export const db = drizzle(sql, { schema });

// --- Query helpers (no Next.js-specific caching) ---

export async function getBooks() {
    return db.query.books.findMany({
        with: {
            author: true,
            booksToCategories: {
                with: { category: true },
            },
        },
        orderBy: [desc(schema.books.id)],
    });
}

export async function getBookBySlug(slug: string) {
    return db.query.books.findFirst({
        where: eq(schema.books.slug, slug),
        with: {
            author: true,
            booksToCategories: {
                with: { category: true },
            },
        },
    });
}

export async function getFeaturedBooks() {
    return db.query.books.findMany({
        limit: 4,
        with: { author: true },
        orderBy: [desc(schema.books.stock)],
    });
}

export async function getCategories() {
    return db.query.categories.findMany();
}

export async function getAuthors() {
    return db.query.authors.findMany({
        with: { books: true },
    });
}

export async function getAuthorById(id: number) {
    return db.query.authors.findFirst({
        where: eq(schema.authors.id, id),
        with: {
            books: {
                with: {
                    author: true,
                    booksToCategories: {
                        with: { category: true },
                    },
                },
            },
        },
    });
}

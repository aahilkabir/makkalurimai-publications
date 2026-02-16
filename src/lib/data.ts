
import { db } from './db';
import { books, authors, categories } from '../../db/schema';
import { eq, desc } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';

// Cache data for SSG/ISR
// Revalidate every hour
export const getBooks = unstable_cache(
    async () => {
        return await db.query.books.findMany({
            with: {
                author: true,
                booksToCategories: {
                    with: {
                        category: true,
                    },
                },
            },
            orderBy: [desc(books.id)],
        });
    },
    ['books-list'],
    { revalidate: 3600, tags: ['books'] }
);

export const getBookBySlug = unstable_cache(
    async (slug: string) => {
        const result = await db.query.books.findFirst({
            where: eq(books.slug, slug),
            with: {
                author: true,
                booksToCategories: {
                    with: {
                        category: true,
                    },
                },
            },
        });
        return result;
    },
    ['book-detail'],
    { revalidate: 3600, tags: ['books'] }
);

export const getFeaturedBooks = unstable_cache(
    async () => {
        return await db.query.books.findMany({
            limit: 4,
            with: {
                author: true,
            },
            orderBy: [desc(books.stock)], // Just an example logic for "featured"
        });
    },
    ['featured-books'],
    { revalidate: 3600 }
);

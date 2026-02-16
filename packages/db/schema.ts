// Shared Drizzle schema — reused by both Next.js and Astro apps.
// Copied from the original db/schema.ts to enable monorepo sharing.

import { pgTable, serial, text, integer, timestamp, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const authors = pgTable('authors', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    bio: text('bio'),
});

export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
});

export const books = pgTable('books', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    authorId: integer('author_id').references(() => authors.id),
    price: integer('price').notNull(),
    stock: integer('stock').notNull().default(0),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    coverImage: text('cover_image'),
});

export const booksToCategories = pgTable('books_to_categories', {
    bookId: integer('book_id').notNull().references(() => books.id),
    categoryId: integer('category_id').notNull().references(() => categories.id),
}, (t) => ({
    pk: primaryKey(t.bookId, t.categoryId),
}));

export const orders = pgTable('orders', {
    id: serial('id').primaryKey(),
    userEmail: text('user_email').notNull(),
    total: integer('total').notNull(),
    status: text('status').notNull().default('pending'),
    stripePaymentId: text('stripe_payment_id'),
    createdAt: timestamp('created_at').defaultNow(),
});

export const orderItems = pgTable('order_items', {
    id: serial('id').primaryKey(),
    orderId: integer('order_id').notNull().references(() => orders.id),
    bookId: integer('book_id').notNull().references(() => books.id),
    quantity: integer('quantity').notNull(),
    price: integer('price').notNull(),
});

// Relations
export const booksRelations = relations(books, ({ one, many }) => ({
    author: one(authors, {
        fields: [books.authorId],
        references: [authors.id],
    }),
    booksToCategories: many(booksToCategories),
}));

export const authorsRelations = relations(authors, ({ many }) => ({
    books: many(books),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
    booksToCategories: many(booksToCategories),
}));

export const booksToCategoriesRelations = relations(booksToCategories, ({ one }) => ({
    book: one(books, {
        fields: [booksToCategories.bookId],
        references: [books.id],
    }),
    category: one(categories, {
        fields: [booksToCategories.categoryId],
        references: [categories.id],
    }),
}));

export const ordersRelations = relations(orders, ({ many }) => ({
    items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id],
    }),
    book: one(books, {
        fields: [orderItems.bookId],
        references: [books.id],
    }),
}));

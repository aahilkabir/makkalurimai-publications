
import 'dotenv/config';
import 'dotenv/config';
import { db, authors, categories, books, booksToCategories } from '../packages/db';

async function seed() {
    console.log('🌱 Seeding database...');

    // 1. Create Authors
    const [author1] = await db.insert(authors).values({
        name: 'J.K. Rowling',
        bio: 'British author, philanthropist, and film producer.',
    }).returning();

    const [author2] = await db.insert(authors).values({
        name: 'George Orwell',
        bio: 'English novelist and essayist, journalist and critic.',
    }).returning();

    // 2. Create Categories
    const [catFiction] = await db.insert(categories).values({
        name: 'Fiction',
        slug: 'fiction',
    }).returning();

    const [catFantasy] = await db.insert(categories).values({
        name: 'Fantasy',
        slug: 'fantasy',
    }).returning();

    // 3. Create Books
    const [book1] = await db.insert(books).values({
        title: 'Harry Potter and the Philosopher\'s Stone',
        authorId: author1.id,
        price: 1999, // $19.99
        stock: 100,
        slug: 'harry-potter-philosophers-stone',
        description: 'A young wizard discovers his magical heritage.',
        coverImage: 'https://placehold.co/400x600?text=Harry+Potter',
    }).returning();

    const [book2] = await db.insert(books).values({
        title: '1984',
        authorId: author2.id,
        price: 1499, // $14.99
        stock: 50,
        slug: '1984',
        description: 'A dystopian social science fiction novel.',
        coverImage: 'https://placehold.co/400x600?text=1984',
    }).returning();

    // 4. Link Books to Categories
    await db.insert(booksToCategories).values([
        { bookId: book1.id, categoryId: catFiction.id },
        { bookId: book1.id, categoryId: catFantasy.id },
        { bookId: book2.id, categoryId: catFiction.id },
    ]);

    console.log('✅ Seeding complete!');
    process.exit(0);
}

seed().catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
});

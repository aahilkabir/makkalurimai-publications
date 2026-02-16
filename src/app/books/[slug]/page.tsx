
import { getBookBySlug, getBooks } from "@/lib/data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import CheckoutButton from "@/components/CheckoutButton";

// SSG: Generate params for all books at build time
export async function generateStaticParams() {
    const books = await getBooks();
    return books.map((book) => ({
        slug: book.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const book = await getBookBySlug(slug);
    if (!book) return { title: 'Book Not Found' };

    return {
        title: `${book.title} | Makkalurimai Publications`,
        description: book.description,
    };
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const book = await getBookBySlug(slug);

    if (!book) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8">
                <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Store
                </Link>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Cover Image */}
                    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-xl aspect-[2/3] relative">
                        <img
                            src={book.coverImage || `https://placehold.co/600x900?text=${encodeURIComponent(book.title)}`}
                            alt={book.title}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Details */}
                    <div>
                        <div className="mb-6">
                            <div className="flex gap-2 mb-4">
                                {book.booksToCategories.map((btc) => (
                                    <Badge key={btc.category.id} variant="secondary">
                                        {btc.category.name}
                                    </Badge>
                                ))}
                            </div>
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{book.title}</h1>
                            <p className="text-xl text-gray-600 font-medium">by {book.author?.name}</p>
                        </div>

                        <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                            {book.description}
                        </p>

                        <div className="border-t border-b py-6 mb-8 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 uppercase tracking-wide">Price</p>
                                <p className="text-3xl font-bold text-gray-900">${(book.price / 100).toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 uppercase tracking-wide text-right">Stock</p>
                                <p className={`text-xl font-semibold text-right ${book.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {book.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {book.stock > 0 ? (
                                <CheckoutButton bookId={book.id} price={book.price} title={book.title} />
                            ) : (
                                <Button size="lg" className="w-full text-lg h-12" disabled>
                                    Out of Stock
                                </Button>
                            )}
                        </div>
                        <p className="text-xs text-gray-400 mt-4 text-center">
                            Secure checkout via Stripe (Coming Soon)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}


import { getBooks } from "@/lib/data";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const books = await getBooks();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">Makkalurimai Publications</Link>
          <nav>
            <Button variant="ghost" asChild><Link href="/books">Browse Books</Link></Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Discover Stories That Matter</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of books from diverse voices and perspectives.
          </p>
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Featured Books</h2>
            <Button variant="link" asChild><Link href="/books">View All</Link></Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <Card key={book.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="aspect-[2/3] w-full bg-gray-200 relative overflow-hidden rounded-t-lg">
                    {/* Placeholder for book cover, in real app use Next.js Image */}
                    <img
                      src={book.coverImage || `https://placehold.co/400x600?text=${encodeURIComponent(book.title)}`}
                      alt={book.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {book.booksToCategories.map((btc) => (
                      <Badge key={btc.category.id} variant="secondary" className="text-xs">
                        {btc.category.name}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-lg mb-1 line-clamp-2">{book.title}</CardTitle>
                  <p className="text-sm text-gray-500 mb-2">{book.author?.name}</p>
                  <p className="font-bold text-lg">${(book.price / 100).toFixed(2)}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button asChild className="w-full">
                    <Link href={`/books/${book.slug}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Makkalurimai Publications. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

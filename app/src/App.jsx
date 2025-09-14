// This is a simple React application that fetches a list of books from a JSON file
// and displays the top 20 books with their titles and images.
// The application uses the useEffect hook to fetch the data when the component mounts
// and the useState hook to manage the loading state and the list of books.
// The application is structured as a functional component and uses ES6 syntax for imports and exports.
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/books.json')
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.slice(0, 20));
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  const toggleFavorite = (book) => {
    if (favorites.includes(book)) {
      setFavorites(favorites.filter((b) => b !== book));
    } else {
      setFavorites([...favorites, book]);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Top 20 Books</h1>
      
        {loading ? (
          <p className="text-center col-span-4">Loading books...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book, idx) => (
            <div key={idx} className="border rounded-lg p-4 shadow hover:shadow-md transition">
              <img
                src={book.imageLink}
                alt={book.title}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="mt-2 text-lg font-bold">{book.title}</h2>
              <p className="text-sm text-gray-600">{book.author}</p>

              <button
                onClick={() => toggleFavorite(book)}
                className={`mt-3 px-3 py-1 rounded ${
                  favorites.includes(book)
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-yellow-200'
                }`}
              >
                {favorites.includes(book) ? '★ Favorited' : '☆ Favorite'}
              </button>
            </div>
          ))}
      </div>
      )}

      {/* Favorites List */}
      {favorites.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Your Favorite Books</h2>
          <ul className="list-disc list-inside space-y-1">
            {favorites.map((book, i) => (
              <li key={i}>{book.title}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default App;

import { useState } from "react";
import "./BookShelf.css";

// Shape of a single book
interface Book {
  title: string;
  author: string;
}

const emptyForm: Book = { title: "", author: "" };

const startingBooks: Book[] = [
  { title: "Project Hail Mary", author: "Andy Weir" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
];

const BookShelf = () => {
  // State for the two inputs
  const [newBook, setNewBook] = useState<Book>(emptyForm);
  // State for the list of books on the shelf
  const [books, setBooks] = useState<Book[]>(startingBooks);

  // One handler per input keeps things easy to follow
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBook({ ...newBook, title: event.target.value });
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBook({ ...newBook, author: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // stop the page from reloading

    // Add the new book to the end of the list
    setBooks([...books, newBook]);

    // Clear the form
    setNewBook(emptyForm);
  };

  return (
    <div className="bookshelf">
      <h1>My Bookshelf</h1>

      <section className="form-card">
        <h2>Add a Book</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={newBook.title}
            onChange={handleTitleChange}
          />

          <label htmlFor="author">Author:</label>
          <input
            id="author"
            type="text"
            value={newBook.author}
            onChange={handleAuthorChange}
          />

          <button type="submit">Add Book</button>
        </form>
      </section>

      <section className="shelf">
        {books.map((book, index) => (
          <div className="book" key={index}>
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default BookShelf;
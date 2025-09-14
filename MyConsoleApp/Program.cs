// See https://aka.ms/new-console-template for more information
using MongoDB.Bson;
using MongoDB.Driver;
using System.Text.Json;
using System.IO;

//Importing books from JSON into MongoDB
var client = new MongoClient("mongodb://localhost:27017");
var database = client.GetDatabase("mybooksdb");

var authorsCollection = database.GetCollection<Author>("authors");
var booksCollection = database.GetCollection<Book>("books");

var json = File.ReadAllText("books.json");
var jsonBooks = JsonSerializer.Deserialize<List<JsonElement>>(json);// in this case I use JsonElement to parse the json file

var authors = authorsCollection.Find(_ => true).ToList();

var books = new List<Book>();
foreach (var jsonBook in jsonBooks)
{
    var book = new Book
    {
        Title = jsonBook.GetProperty("title").GetString(),
        AuthorId = authors.First(a => a.Name == jsonBook.GetProperty("author").GetString()).Id,
        Language = jsonBook.GetProperty("language").GetString(),
        Pages = jsonBook.GetProperty("pages").GetInt32(),
        ImageLink = jsonBook.GetProperty("imageLink").GetString(),
        Link = jsonBook.GetProperty("link").GetString(),
        Year = jsonBook.GetProperty("year").GetInt32()
    };
    books.Add(book);
}

if (books.Any())
{
    booksCollection.InsertMany(books);
    Console.WriteLine($"Inserted {books.Count} books into the database.");
}
else
{
    Console.WriteLine("No books to insert.");
}

//First 20 book titles are imported into the database.

var firstTwentyBooks = booksCollection.Aggregate()
    .Lookup(Book, Author, BsonDocument > (
        authorsCollection, b => b.AuthorId, a => a.Id, (Book b, Author a) => new { b.Title, AuthorName = a.Name })
    .Limit(20).Project(b => new
    {
        Title = b["title"],
        Year = b["year"],
        Pages = b["pages"],
        ImageLink = b["imageLink"],
        Link = b["link"],
        AuthorName = b["author"]["name"]
    })
    .ToList();

foreach (var book in firstTwentyBooks)
{
    Console.WriteLine($"Title: {book.Title}, Author: {book.AuthorName}, Year: {book.Year}, Pages: {book.Pages}, ImageLink: {book.ImageLink}, Link: {book.Link}");
}

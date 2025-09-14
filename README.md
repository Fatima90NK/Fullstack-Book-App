# Fullstack Book App 

## Overview

This project initially started as a mock assessment via **CodeOp** for fullstack software engineering. Rather than strictly following the original rules, I used this project as an opportunity to develop my skills and experiment with tech stack I’m interested in.

The goal is to design an app that displays books from a JSON dataset and connects to a backend API, allowing for future features like favoriting books.

## Tech Choices

| Technology    | Why I Chose It                                                                                                                           |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **.NET / C#** | To practice backend development and build an **ASP.NET Core Web API**, strengthening my skills in C#.                                    |
| **MongoDB**   | Document-based database that works naturally with JSON-like data. Fits perfectly with the book dataset.                                  |
| **Docker**    | Ensures the environment is **reproducible**, making it easy for anyone to run the project without setup issues.                          |
| **Frontend**  | Can be extended with frameworks like React, Vue, or even plain HTML/TypeScript. Optional styling with **Bootstrap** or **Tailwind CSS**. |

---

## Project Structure

* `Backend/` — ASP.NET Core Web API project
* `Data/` — JSON file with book dataset (`books.json`)
* `Docker/` — Docker configuration for MongoDB
* `Frontend/` — Optional front-end code for displaying books and favorites

MongoDB contains two collections:

1. **Authors** — Stores unique author records.
2. **Books** — Stores book records linked to authors via `AuthorId`.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <repo-folder>
```

### 2. Start MongoDB in Docker

```bash
docker run --name mybooksdb -d -p 27017:27017 mongo
```

### 3. Import JSON Data into MongoDB

* Start the `.NET console app` in `Backend/` that reads `books.json` and inserts authors and books into the database.

### 4. Run the ASP.NET Core Web API

```bash
cd Backend
dotnet run
```

* The API exposes endpoints to retrieve books, authors, and handle favorite actions.

### 5. Optional: Frontend

* Create a frontend that consumes the API endpoints.
* Display the first 20 books with their title, author, and image.
* Add a “favorite” button if desired.

---

## Quick Start (For Recruiters)

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd <repo-folder>
```

2. **Start MongoDB using Docker**

```bash
docker run --name mybooksdb -d -p 27017:27017 mongo
```

3. **Populate the database**

* Run the `.NET console app` in `Backend/` to import authors and books from `books.json`.

4. **Run the API**

```bash
cd Backend
dotnet run
```

5. **View first 20 books**

* Open a browser or Postman to test the API endpoint for retrieving books.


## Future Improvements

* **Favorites feature**: Allow users to save favorite books in the database.
* **Search and filter**: Filter books by author, year, or language.
* **UI enhancements**: Add better styling with **Tailwind CSS** or **Bootstrap**.
* **Authentication**: Add a user system to save personal favorite lists.


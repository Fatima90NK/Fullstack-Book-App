//(Handles book listing and book details)
//import express from "express";
//import getBooks from "/public/books.json";

//goal = only list the first 20 book titles. 
//books.json has more than 20 titles listed
//as of now the json file is not being used
//i will need to fetch the data from the json file
//to display the book titles
//i will also need to create a function to fetch the data from the json file

export async function getBooks(limit = 20) {
  try {
    const response = await fetch('/books.json');//pulls data from books.json
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Parse the response as JSON
    // Check if the response is valid JSON
    const data = await response.json();
    console.log("Top 20", data); // Log the raw response to see its structure

    // Check if the response contains an array of books
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format");
    }

    // Limit the number of books to the specified limit
    return data.slice(0, limit);
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
}


//export default getBooks;
    



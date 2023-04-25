import { getBook } from "./api.js";

const search = window.location.search;
const searchParams = new URLSearchParams(search);
const id = searchParams.get('id');

const renderBooks = async () => {
  const nameInput = document.getElementById("name");
  const authorInput = document.getElementById("author");
  const publishYearInput = document.getElementById("publishYear");
  const publishHouseInput = document.getElementById("publishHouse");
  const pagesNumberInput = document.getElementById("pagesNumber");
  const genresInput = document.getElementById("genres");
  const originalLanguageInput = document.getElementById("originalLanguage");

try {
  const book = await getBook(id)
  nameInput.value = book.name;
  authorInput.value = book.author;
  publishYearInput.value = book.publishYear;
  publishHouseInput.value = book.publishHouse;
  pagesNumberInput.value = book.pagesNumber;
  genresInput.value = book.genres;
  originalLanguageInput.value = book.originalLanguage;
}
catch {
  console.log('ERR')
  }
}
    
renderBooks()


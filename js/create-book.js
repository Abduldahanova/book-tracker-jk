const API_URL = "http://localhost:1717"

let createEl = document.createElement("a")
createEl.href = "http://localhost:1717/index.html"
const link = document.querySelector("a")
const saveBtn = document.querySelector("#save-create-btn")

saveBtn.addEventListener("click", async () => {
  try {
    const books = {
      name: document.querySelector("#name").value,
      author: document.querySelector("#author").value,
      publishYear: Number(document.querySelector("#publishYear").value),
      publishHouse: document.querySelector("#publishHouse").value,
      pagesNumber: Number(document.querySelector("#pagesNumber").value),
      genres: Array(document.querySelector("#genres").value),
      originalLanguage: document.querySelector("#originalLanguage").value,
    }

    const createBook = await fetch(`${API_URL}/books/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(books),
    })

    console.log(createBook)

    if (!createBook.ok) {
      throw new Error(`Failed to create book: ${createBook.status}`)
    }

    const createdBook = await createBook.json()
    console.log("Created:", createdBook)

    link.click() 

  } catch (error) {
    console.error(error)
  }
})
const API_URL = "http://localhost:1717"

let link = document.createElement("a")
let linke= ""
const booksId = new URLSearchParams(window.location.search).get('id')
const inputs = document.querySelectorAll('input')
inputs.forEach((value) => {
 linke= value.value.length
  link.href = `http://127.0.0.1:5500/detail.html?id=${booksId}`

  const saveBtn = document.querySelector("#save-edit-btn")

  saveBtn.addEventListener("click", async () => {
    try {
      if (linke < 40) {
        const publishYearInput = document.querySelector("#publishYear");
        const pagesNumberInput = document.querySelector("#pagesNumber");

        const book = {
          name: document.querySelector("#name").value,
          author: document.querySelector("#author").value,
          publishYear: publishYearInput.value ? Number(publishYearInput.value) : null,
          publishHouse: document.querySelector("#publishHouse").value,
          pagesNumber: pagesNumberInput.value ? Number(pagesNumberInput.value) : null,
          genres: Array(document.querySelector("#genres").value),
          originalLanguage: document.querySelector("#originalLanguage").value,
        }
        const updateBook = await fetch(`${API_URL}/books/update/${booksId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(book),
        })

        console.log(updateBook);

        if (!updateBook.ok) {
          throw new Error(`Failed to update book: ${updateBook.status}`)
        }

        const updatedBook = await updateBook.json();
        console.log("Updated book:", updatedBook)

        link.click()

      }

    } catch (error) {
      console.error(error)
    }
  })
})
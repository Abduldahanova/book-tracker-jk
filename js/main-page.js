import { createEl } from './utils.js'
import { unlikeSvg ,likeSvg, deleteSvg } from './svg-icons.js'
import { getBooks } from './api.js'
import {removeLoader, renderError, renderLoader} from './helper.js'


const API_URL = 'http://localhost:1717'


const renderBookItem = (data) => {
  const container = createEl({ tag: 'div', className: 'book' })
  const bookName = createEl({ tag: 'h2', text: data.name })
  const bookAuthor = createEl({ tag: 'p', text: data.author })
  const detailLink = createEl({ tag: 'a', className: 'detail-link', href: `/detail.html?id=${data.id}`, text: 'Подробнее...' })
  const likeBtn = createEl({ tag: 'button', className: 'like-btn icon-btn', innerHTML: unlikeSvg})
  likeBtn.setAttribute('data-like', 'unliked')
  const deleteBtn = createEl({ tag: 'button', className: 'delete-btn icon-btn', innerHTML: deleteSvg })


  deleteBtn.addEventListener('click', async () => {
    if(confirm('delete this book?') === true) {
      const container = deleteBtn.parentNode
      container.parentNode.removeChild(container)}
      await deleteBook(data.id);
  })  

  likeBtn.addEventListener('click', async () => {
    const isLike = likeBtn.getAttribute('data-like')
    if(isLike === 'liked') {
      likeBtn.setAttribute('data-like', 'unliked')
      likeBtn.innerHTML = unlikeSvg
    } else {
      likeBtn.setAttribute('data-like', 'liked')
      likeBtn.innerHTML = likeSvg
    }
    await changeLike(data.id)
  })


async function deleteBook(id) {
  const response = await fetch(`${API_URL}/books/delete/${id}`, {
    method: 'DELETE'
  })
  const data = await response.json()
  return data
}

async function changeLike(id) {
  const response = await fetch(`${API_URL}/books/update/${id}`, {
    
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify()
  })
  const data = await response.json()
  return data
}

container.append(bookName, bookAuthor, detailLink, likeBtn, deleteBtn)
return container
}

const renderBooks = async () => {
  const container = document.querySelector('.catalog')
  renderLoader(container)

  try {
    const books = await getBooks()
    books.forEach((book) => {
      const bookElement = renderBookItem(book)
      container.append(bookElement)
    })
  }
  catch {
    renderError(container)
  }
  finally {
    removeLoader()
  }
}
renderBooks()



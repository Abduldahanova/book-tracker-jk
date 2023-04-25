import { getBook } from "./api.js";
import { createEl } from './utils.js'
import { unlikeSvg ,likeSvg, deleteSvg } from './svg-icons.js'



const search = window.location.search;
const searchParams = new URLSearchParams(search);
const id = searchParams.get('id');

const createRow = (val1, val2) => {
  const tr = createEl({tag: 'tr'})
  const td1 = createEl({tag: 'td', text: val1})
  tr.append(td1)
  const td2 = createEl({tag: 'td', text: val2})
  tr.append(td2)
  return tr
} 

const changeLike = (isLike, el) => {
  if(isLike === 'liked') {
    el.setAttribute('data-like', 'unliked')
    el.innerHTML = unlikeSvg
  } else {
    el.setAttribute('data-like', 'liked')
    el.innerHTML = likeSvg
  }
}
const container = (isDelete, el) => {
  if (isDelete) {
    el.style.display = 'none';
  } else {
    el.style.display = 'block';
  }
}

const renderBooks = async () => {
  const container = document.querySelector('.book-details')
  const table = document.querySelector('.book-detail__table')
  const editButton = document.querySelector('.edit-link')
  const editLink = document.querySelector('.edit-link')
  const likeBtn = createEl({ tag: 'button', className: 'like-btn icon-btn', innerHTML: unlikeSvg})
  likeBtn.setAttribute('data-like', 'unliked')
  likeBtn.addEventListener('click', () => changeLike(likeBtn.getAttribute('data-like'), likeBtn))
  const deleteBtn = createEl({ tag: 'button', className: 'delete-btn icon-btn', innerHTML: deleteSvg })
  deleteBtn.addEventListener('click', () => {
    const container = deleteBtn.parentNode;
    container.parentNode.removeChild(container);
  }) 
try {
  const book = await getBook(id)
  const title = createEl({tag: 'h1', text: book.name})
   
  const tr = createRow(' Автор', book.author)
  const tr2 = createRow('Страницы', book.pagesNumber)
  const tr3 = createRow('Год выпуска', book.publishYear)
  const tr4 = createRow('Издательство', book.publishHouse)
  const tr5 = createRow('Количество страниц', book.pagesNumber)
  const tr6 = createRow('Жанры', book.genres)
  const tr7 = createRow('Язык оригинала', book.originalLanguage)
  
  table.append(tr)
  table.append(tr2)
  table.append(tr3)
  table.append(tr4)
  table.append(tr5)
  table.append(tr6)
  table.append(tr7)
  container.append(title, editLink, likeBtn, deleteBtn, table)
  editButton.setAttribute('href', `/edit.html?id=${id}`)
}
catch {
console.log('ERR')
}
  }
  
  renderBooks()
  

import { createEl } from './utils.js'

export const renderLoader = (parent) => {
    const loader = createEl({
      tag: 'div',
      className: 'loader',
      text: 'Загрузка...'
    })
    parent.append(loader)
  }
  
export const renderError = (parent) => {
    const error = createEl({ 
      tag: 'div',
      className: 'error',
      text: 'Произошла ошибка'
    })
    parent.append(error)
  }
  
export const removeLoader = () => {
    document.querySelector('.loader').remove()
  }
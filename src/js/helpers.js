import { buildTodoTemplate } from './template.js'

// helpers
function $(selector) {
  return document.querySelector(selector)
}

// local storage
function getData() {
  return JSON.parse(localStorage.getItem('data')) || []
}

function setData(source) {
  localStorage.setItem('data', JSON.stringify(source))
}

// render
function render(data, todoColumn, progressColumn, doneColumn) {
  let todoTemplates = ''
  let inProgressTemplates = ''
  let doneTemplates = ''
  data.forEach((item) => {
    const template = buildTodoTemplate(item)

    item.status == 'todo' ? todoTemplates += template : ''
    item.status == 'inProgress' ? inProgressTemplates += template : ''
    item.status == 'done' ? doneTemplates += template : ''
  })

  todoColumn.innerHTML = todoTemplates
  progressColumn.innerHTML = inProgressTemplates
  doneColumn.innerHTML = doneTemplates
}

export { $, getData, setData, render }

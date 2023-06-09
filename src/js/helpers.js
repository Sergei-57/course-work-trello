import { buildTodoTemplate, buildTemplateDone, buildTemplateInProgress, buildTemplateTodo } from './template.js'

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
function render(data, todoColumn, inProgressColumn, doneColumn) {
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
  inProgressColumn.innerHTML = inProgressTemplates
  doneColumn.innerHTML = doneTemplates
}

// render count
function renderCounters(collection, todoCount, inProgressCount, doneCount) {
  let todo = 0
  let inProgress = 0
  let done = 0

  collection.forEach((item) => {
    item.status == 'todo' ? todo++ : ''
    item.status == 'inProgress' ? inProgress++ : ''
    item.status == 'done' ? done++ : ''
  })
  const templateTodo = buildTemplateTodo(todo)
  const templateInProgress = buildTemplateInProgress(inProgress)
  const templateDone = buildTemplateDone(done)

  todoCount.innerHTML = templateTodo
  inProgressCount.innerHTML = templateInProgress
  doneCount.innerHTML = templateDone
}

export { $, getData, setData, render, renderCounters }

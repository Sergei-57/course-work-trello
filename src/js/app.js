import { Todo } from './constructor.js'
import { getTime } from './clock.js'
import { $, render, renderCounters, setData, getData } from './helpers.js'

// bootstrap import
import { Modal } from 'bootstrap'

// variables
let data = getData()
const todoElement = $('#todo')
const btnAddElement = $('#buttonAdd')
const btnRemoveAllElement = $('#buttonRemoveAll')
const modalTitleElement = $('#modalTitle')
const modalTextareaElement = $('#modalTextarea')
const selectColorElement = $('#selectColor')
const selectUserElement = $('#selectUser')
const formElement = $('#form')
const editFormElement = $('#editForm')
const inProgressElement = $('#inProgress')
const doneElement = $('#done')
const rowElement = $('#row')
const modalEditElement = $('#editModal')
const modalEditInstance = Modal.getOrCreateInstance(modalEditElement)
const modalElement = $('#modal')
const modalInstance = Modal.getOrCreateInstance(modalElement)
const countTodoElemet = $('#countTodo')
const countInProgressElement = $('#countInProgress')
const countDoneElement = $('#countDone')
const modalEditTitleELement = $('#modalEditTitle')
const modalEditTextareaElement = $('#modalEditTextarea')
const selectEditColorElement = $('#selectEditColor')
const selectEditUserElement = $('#selectEditUser')
const editIdElement = $('#editId')
const editDateElement = $('#editDate')
const editStatusElement = $('#editStatus')

// users
const urlUsersElement = 'https://jsonplaceholder.typicode.com/users'

// listener
btnAddElement.addEventListener('click', handleModal)
formElement.addEventListener('submit', handleSubmitForm)
rowElement.addEventListener('click', handleClickDelete)
window.addEventListener('beforeunload', handleBeforeUnload)
rowElement.addEventListener('change', handleChangeStatus)
btnRemoveAllElement.addEventListener('click', handleClickRemoveAll)
rowElement.addEventListener('click', handleEditModal)
editFormElement.addEventListener('submit', handleSubmitEditForm)

// clock
setInterval(getTime, 1000)

// modal
function handleModal() {
  modalInstance.show()
}

// local storage
function handleBeforeUnload() {
  setData(data)
}

// init
render(data, todoElement, inProgressElement, doneElement)
renderCounters(data, countTodoElemet, countInProgressElement, countDoneElement)

// main form
function handleSubmitForm(event) {
  event.preventDefault()

  const todoTitle = modalTitleElement.value
  const todoDescription = modalTextareaElement.value
  const selectColor = selectColorElement.value
  const selectUser = selectUserElement.value
  const todo = new Todo(todoTitle, todoDescription, selectColor, selectUser)

  data.push(todo)
  render(data, todoElement, inProgressElement, doneElement)
  renderCounters(data, countTodoElemet, countInProgressElement, countDoneElement)
  modalInstance.hide()
  formElement.reset()
}

// edit form
function handleSubmitEditForm(event) {
  event.preventDefault()

  const title = modalEditTitleELement.value
  const description = modalEditTextareaElement.value
  const color = selectEditColorElement.value
  const user = selectEditUserElement.value
  const id = editIdElement.value
  const date = editDateElement.value
  const status = editStatusElement.value

  data = data.filter((item) => item.id != id)
  const todo = new Todo(title, description, color, user, id, date, status)
  data.push(todo)
  render(data, todoElement, inProgressElement, doneElement)
  renderCounters(data, countTodoElemet, countInProgressElement, countDoneElement)
  modalEditInstance.hide()
  formElement.reset()
}

// edit Modal
function handleEditModal(event) {
  const { target } = event
  const { role } = target.dataset
  const parentNode = target.closest('.card__wrap')
  if (role == 'edit') {
    data.forEach((item) => {
      if (item.id == parentNode.id) {
        modalEditTitleELement.value = item.title
        modalEditTextareaElement.value = item.description
        selectEditColorElement.value = item.bgColor
        selectEditUserElement.value = item.user
        editIdElement.value = item.id
        editStatusElement.value = item.status
        editDateElement.value = item.date
      }
    })
    modalEditInstance.show()
  }
}

// remove all cards
function handleClickRemoveAll() {
  const message = confirm('Are you sure you want to delete all cards?')
  if (message) {
    data = data.filter((item) => item.status != 'done')
    render(data, todoElement, inProgressElement, doneElement)
    renderCounters(data, countTodoElemet, countInProgressElement, countDoneElement)
  }
}

// delete card
function handleClickDelete(event) {
  const { target } = event
  const { role, id } = target.dataset

  if (role == 'delete') {
    data = data.filter((item) => item.id != id)
    render(data, todoElement, inProgressElement, doneElement)
    renderCounters(data, countTodoElemet, countInProgressElement, countDoneElement)
  }
}

// overflow process
function handleChangeStatus(event) {
  const { target } = event
  const { role, id } = target.dataset
  let countInProgress = 0

  data.forEach((item) => {
    item.status == 'inProgress' ? countInProgress++ : ''
  })

  if (role == 'select' && countInProgress == 4 && target.value == 'inProgress') {
    alert('In this block, you can not add more than 4 cards')
    data.forEach((item) => {
      if (item.status == 'todo') {
        target.value = 'todo'
      }
      if (item.status == 'done') {
        target.value = 'done'
      }
    })
    return
  } else if (role == 'select') {
    data.forEach((item) => {
      if (item.id == id) {
        item.status = target.value
      }
    })
    render(data, todoElement, inProgressElement, doneElement)
    renderCounters(data, countTodoElemet, countInProgressElement, countDoneElement)
  }
}

// getUsers
getUsers(urlUsersElement)
  .then((data) => {
    data.forEach((user) => {
      const template = `
        <option value="${user.name}">${user.name}</option>
      `
      selectUserElement.innerHTML += template

      const templateEdit = `
        <option value="${user.name}">${user.name}</option>
      `
      selectEditUserElement.innerHTML += templateEdit
    })
  })

async function getUsers(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`)
  }

  return await response.json()
}

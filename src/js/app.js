import { Todo } from './constructor.js'
import { getTime } from './clock.js'
import { $, render, renderCounters, setData, getData } from './helpers.js'


// bootstrap import
import { Modal } from 'bootstrap'

// Variables
let data = getData()
const todoElement = $('#todo')
const btnAddElement = $('#btnAdd')
const btnRemoveAllElement = $('#btnRemoveAll')
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
const contentCountTodo = $('#contentCountTodo')
const contentCountProgress = $('#contentCountProgress')
const contentCountDone = $('#contentCountDone')

// modal edit
const modalEditTitleELement = $('#modalEditTitle')
const modalEditTextareaElement = $('#modalEditTextarea')
const selectEditColorElement = $('#selectEditColor')
const selectEditUserElement = $('#selectEditUser')
const editId = $('#editId')
const editStatus = $('#editStatus')
const editDate = $('#editDate')

// url users
const urlUsers = 'https://jsonplaceholder.typicode.com/users'

// Listener
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
renderCounters(data, contentCountTodo, contentCountProgress, contentCountDone)

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
  renderCounters(data, contentCountTodo, contentCountProgress, contentCountDone)
  modalInstance.hide()
  formElement.reset()
}

// Edit form
function handleSubmitEditForm(event) {
  event.preventDefault()

  const title = modalEditTitleELement.value
  const description = modalEditTextareaElement.value
  const color = selectEditColorElement.value
  const user = selectEditUserElement.value
  const id = editId.value
  const date = editDate.value
  const status = editStatus.value

  data = data.filter((item) => item.id != id)
  const todo = new Todo(title, description, color, user, id, date, status)
  data.push(todo)
  render(data, todoElement, inProgressElement, doneElement)
  renderCounters(data, contentCountTodo, contentCountProgress, contentCountDone)
  modalEditInstance.hide()
  formElement.reset()
}

// Edit Modal
function handleEditModal(event) {
  const { target } = event
  const { role } = target.dataset
  const parentNode = target.closest('.card__wrapper')
  if (role == 'edit') {
    data.forEach((item) => {
      if (item.id == parentNode.id) {
        modalEditTitleELement.value = item.title
        modalEditTextareaElement.value = item.description
        selectEditColorElement.value = item.bgColor
        selectEditUserElement.value = item.user
        editId.value = item.id
        editStatus.value = item.status
        editDate.value = item.date
      }
    })
    modalEditInstance.show()
  }
}

// length progress
function handleChangeStatus(event) {
  const { target } = event
  const { role, id } = target.dataset
  let countProgress = 0

  data.forEach((item) => {
    item.status == 'inProgress' ? countProgress++ : ''
  })

  if (role == 'select' && countProgress == 4 && target.value == 'inProgress') {
    alert('No more than 4 cases can be in this column')
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
    renderCounters(data, contentCountTodo, contentCountProgress, contentCountDone)
  }
}

// delete card
function handleClickDelete(event) {
  const { target } = event
  const { role, id } = target.dataset

  if (role == 'delete') {
    data = data.filter((item) => item.id != id)
    render(data, todoElement, inProgressElement, doneElement)
  }
}

// remove all
function handleClickRemoveAll() {
  const messageWarning = confirm('are you sure you want to delete all todos')
  if (messageWarning) {
    data = data.filter((item) => item.status != 'done')
    render(data, todoElement, inProgressElement, doneElement)
    renderCounters(data, contentCountTodo, contentCountProgress, contentCountDone)
  }
}

// getUsers
getUsers(urlUsers)
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

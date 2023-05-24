import { Todo } from './constructor.js'
import { getTime } from './clock.js'
import { $ } from './helpers.js'
import { buildTodoTemplate } from './buildTodoTemplate.js'

// bootstrap import
import { Modal } from 'bootstrap'

// Variables
let data = getData()
const todoElement = document.querySelector('#todo')
const btnAddElement = $('#btnAdd')
const btnRemoveAllElement = $('#btnRemoveAll')
const modalEditElement = document.querySelector('#editModal')
const modalTitleElement = document.querySelector('#modalTitle')
const modalTextareaElement = document.querySelector('#modalTextarea')
const selectColorElement = document.querySelector('#selectColor')
const selectUserElement = document.querySelector('#selectUser')
const formElement = document.querySelector('#form')
const editFormElement = document.querySelector('#editForm')
const inProgressElement = document.querySelector('#inProgress')
const doneElement = document.querySelector('#done')
const rowElement = document.querySelector('#row')
const modalEditInstance = Modal.getOrCreateInstance(modalEditElement)
const modalElement = document.querySelector('#modal')
const modalInstance = Modal.getOrCreateInstance(modalElement)

// Modal edit
const modalEditTitleELement = document.querySelector('#modalEditTitle')
const modalEditTextareaElement = document.querySelector('#modalEditTextarea')
const selectEditColorElement = document.querySelector('#selectEditColor')
const selectEditUserElement = document.querySelector('#selectEditUser')
const editId = document.querySelector('#editId')
const editStatus = document.querySelector('#editStatus')
const editDate = document.querySelector('#editDate')

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

// Render
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

// Modal
function handleModal() {
  modalInstance.show()
}



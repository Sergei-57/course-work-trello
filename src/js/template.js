//  build template
function buildTodoTemplate(todo) {
  const date = new Date(todo.date).toLocaleString()
  const statusTodo = todo.status == 'todo' ? 'selected' : ''
  const statusInProgress = todo.status == 'inProgress' ? 'selected' : ''
  const statusDone = todo.status == 'done' ? 'selected' : ''
  return `
  <div id="${todo.id}" class="card__wrap m-3 p-2 border border-primary border-2 rounded-4 d-flex flex-column gap-2 ${todo.bgColor}">
  <div class="card__top d-flex">
    <h2 class="card__title w-100">Title: ${todo.title}</h2>
    <span class="card__date flex-shrink-1">${date}</span>
  </div>
  <div class="card__description">Description: ${todo.description}</div>
  <div class="card__user">User: ${todo.user}</div>
  <select class="form-select select-status" data-role="select" data-id="${todo.id}">
    <option value="todo" ${statusTodo}>Todo</option>
    <option value="inProgress" ${statusInProgress}>In progress</option>
    <option value="done" ${statusDone}>Done</option>
  </select>
  <button class="btn btn-primary me-1 ms-2" data-role="edit">Edit</button>
  <button class="btn btn-danger me-1 ms-1" data-role="delete" data-id="${todo.id}">Remove</button>
</div>
 `
}

// counter template
function buildTemplateTodo(countTodo) {
  return `
    <span>${countTodo}</span>
  `
}
function buildTemplateInProgress(countInProgress) {
  return `
    <span>${countInProgress}</span>
  `
}
function buildTemplateDone(countDone) {
  return `
    <span>${countDone}</span>
  `
}

export { buildTodoTemplate, buildTemplateDone, buildTemplateInProgress, buildTemplateTodo }

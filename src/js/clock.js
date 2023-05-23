import { $ } from './helpers.js'

// Variables
const clockElement = $('#clock')

function getTime() {
  let date = new Date()
  let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  clockElement.innerHTML = `${hours}:${minutes}`
}

export { getTime }

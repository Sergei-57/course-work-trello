import { getTime } from './clock.js'
import { $ } from './helpers.js'

// bootstrap import
import { Modal } from 'bootstrap'

// Variables
const btnAddElement = $('#btnAdd')
const btnRemoveAllElement = $('#btnRemoveAll')

// clock
setInterval(getTime, 1000)


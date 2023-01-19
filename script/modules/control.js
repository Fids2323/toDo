import {setStorage, getStorage, removeStorage, classStorage,editStorage} from "./serviceStorage.js"
import createRow from './createElements.js'
import { renderNumbers } from "./render.js"

const importanceControl = (tbody,name) => {
	const optionsMap = {
		"Обычная": "table-light",
		"Важная": "table-warning",
		"Срочная": "table-danger"
	}
	tbody.addEventListener('change', (e) =>{
		const target = e.target
		if(target.classList.contains('form-select')){
			const tr = target.closest('tr')
			const task = tr.querySelectorAll('td')[1]
			task.className = 'task'
			const index= tr.dataset.id
			const selectedValue = target.value;
			tr.className = optionsMap[selectedValue]
			classStorage(name, index, tr.className)
		}
	
	})
}


const editControl = (tbody, name) => {
	tbody.addEventListener('click', (e) =>{
		const target = e.target
		if(target.classList.contains('btn-primary')){
			const tr = target.closest('tr')
			const tdTask = tr.querySelectorAll('td')[1]
			tdTask.setAttribute("contenteditable", true)
			tdTask.addEventListener("input", e => {
				tdTask.className = "task"
				tr.className = "table-light"
				tr.querySelectorAll('td')[2].textContent= 'В процессе'
				editStorage(name, tr.dataset.id, tdTask.textContent,tr.className)
			})
		}
	})
	
}

const inputControl = () => {
	const form = document.querySelector("form");
	const input = form.querySelector("input.form-control");
	const submitBtn = form.querySelector("button[type='submit']");
	submitBtn.disabled = true;
	input.addEventListener("input", e => {
		if (e.target.value === "") {
			submitBtn.disabled = true;
		} else {
			submitBtn.disabled = false;
		}
	});
}

const deleteTodo = (tbody, name) => {
	tbody.addEventListener('click', (e) =>{
		const target = e.target
		if(target.classList.contains('btn-danger')){
			const question = confirm('Точно хочешь удалить?')
			if (!question) return;
			const tr = target.closest('tr')
			const id = target.closest('tr').dataset.id
			removeStorage(name, id)
			tr.remove()
		}
		renderNumbers()
	})
}

const successTodo = (tbody,name) => {
	tbody.addEventListener('click', (e) =>{
		e.preventDefault();
		const target = e.target
		if(target.classList.contains('btn-success')){
			const tr = target.closest('tr')
			const select =tr.querySelector('.form-select')
			select.value = 'Обычная'
			const id = target.closest('tr').dataset.id
			const tdTask = tr.querySelectorAll('td')[1]
			if(tdTask.className === "text-decoration-line-through") {
				tdTask.className = "task"
				tr.className = "table-light"
				tr.querySelectorAll('td')[2].textContent= 'В процессе'
			}else {
				tdTask.className = "text-decoration-line-through"
				tr.className = "table-success"
				tr.querySelectorAll('td')[2].textContent= 'Выполнена'
			}
			classStorage(name, id, tr.className)
		}
	})
}



const formControl = (name) => {
	const form = document.querySelector('form')
	const input = document.querySelector('.form-control')
	const tbody = document.querySelector('tbody')
	const submitBtn = form.querySelector("button[type='submit']");
	form.addEventListener('submit', e => {
    e.preventDefault();
		const index = getStorage(name).length + 1
		const value = input.value;
		form.reset();
		const toDo = {
			id:Math.random().toString().substring(2, 10),
			text: value,
			class:'table-light',
		}
		setStorage(name, toDo);
		const tr = createRow(toDo.id, toDo.text, toDo.class, index)
		tbody.append(tr)
		submitBtn.disabled=true;
	})
	deleteTodo(tbody,name)
	successTodo(tbody,name)
	editControl(tbody, name)
	importanceControl(tbody,name)
}



export  {
	formControl,
	inputControl
	}

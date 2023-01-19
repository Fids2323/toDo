import {getStorage} from './serviceStorage.js';
import createRow from './createElements.js';

const renderNumbers = () => {
	const tbody = document.querySelector('tbody');
	const rowsArray = tbody.querySelectorAll('tr')
	rowsArray.forEach((row, index) =>{
		const tdNumber = row.querySelectorAll('td')[0];
		tdNumber.textContent = ++index
	})
	
}

const renderTable = (name) => {
	const data = getStorage(name)
	const tbody = document.querySelector('tbody');
	tbody.textContent = "";
	data.map((todo,index)=> {
		const tr = createRow(todo.id,todo.text,todo.class, ++index);
		tbody.append(tr)
	})
}



export {
	renderTable,
	renderNumbers
}
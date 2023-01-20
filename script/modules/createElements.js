
const renderClass = classes => {
	if (classes=== "table-light") return "Обычная";
	if (classes=== "table-warning") return "Важная";
	if (classes=== "table-danger") return "Срочная";
	if (classes=== "table-success") return "Обычная";
}

const createRow = (id, text, classes, length) => {
	const tr = document.createElement('tr');
	const tdNum = document.createElement('td');
	const tdTask = document.createElement('td');
	const tdProcess = document.createElement('td');
	const tdBtns = document.createElement('td');
	const btnDelete = document.createElement('button');
	const btnSuccess = document.createElement('button');
	const BtnEdit = document.createElement('button');

	const select = document.createElement("select");
	const options = ["Обычная", "Важная", "Срочная"];
	select.classList.add("form-select");
	options.forEach((option) => {
		const selectOption = document.createElement("option");
		selectOption.value = option;
		selectOption.textContent = option;
		select.append(selectOption);
	});
	select.value = renderClass(classes)
	btnSuccess.classList = "btn btn-success"
	btnSuccess.textContent = 'Завершить'
	btnDelete.classList = "btn btn-danger"
	btnDelete.textContent = 'Удалить'
	BtnEdit.classList= "btn btn-primary"
	BtnEdit.textContent = 'Редактировать'
	tdBtns.append(btnDelete, btnSuccess,BtnEdit, select)


	tdProcess.textContent = classes==="table-success"? 'Выполнена' : 'В процессе'
	tdTask.classList = classes==="table-success" ? "text-decoration-line-through" : "task"
	tdTask.textContent = text;
	tdNum.textContent = length;
	tr.append(tdNum, tdTask, tdProcess, tdBtns)
	tr.classList = classes
	tr.dataset.id = id
	return tr
}

export default createRow
import { getStorage } from "./modules/serviceStorage.js"
import {formControl,inputControl} from "./modules/control.js"
import {renderTable} from "./modules/render.js"


{
const init = () => {
	const name =prompt('Ваше имя ?')
	getStorage(name)
	inputControl()
	formControl(name)
	inputControl()
	renderTable(name)
}

	window.toDo = init
}
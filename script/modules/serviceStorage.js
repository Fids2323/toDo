//Local storage
const getStorage = key => JSON.parse(localStorage.getItem(key)) || [];

const editStorage = (key, id, editText, classes) => {
	let data = getStorage(key);
	data = data.map((item) => {
		if (item.id === id) {
			return {...item, text: editText, class : classes};
		}
		return item;
	})
	localStorage.setItem(key, JSON.stringify(data));
}

const setStorage = (key, obj) => {
  const data = getStorage(key);
  data.push(obj);
  localStorage.setItem(key, JSON.stringify(data));
};

const removeStorage = (key, id) => {
  let data = getStorage(key);
  data = data.filter(item => item.id !== id);
  localStorage.setItem(key, JSON.stringify(data));
};

const classStorage = (key, id, classes) => {
  let data = getStorage(key);
  data = data.map((item) => {
		if (item.id === id) {
			return {...item, class: classes};
		}
		return item;
	});
  localStorage.setItem(key, JSON.stringify(data));
};

export {
  getStorage,
  setStorage,
  removeStorage,
	classStorage,
	editStorage
};

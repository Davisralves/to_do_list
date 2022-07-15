const input = document.getElementsByTagName("input")[0];
const lastButton = document.getElementById("salvar-tarefas");
const addButton = document.getElementById("add-task");

const addItem = (event: Event, list: ToDoList) => {
	event.preventDefault();
	const task = new Task(input.value);
	list.addTask(task);
	console.log(list);
	list.renderList();
};

const list = new ToDoList();
lastButton.insertAdjacentElement("afterend", list.renderList());
addButton.addEventListener("click", (e: Event) => addItem(e, list));

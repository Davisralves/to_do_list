const input = document.getElementsByTagName("input")[0];
const lastButton = document.getElementById("salvar-tarefas");
const addButton = document.getElementById("add-task");
const deleteButton = document.getElementById("apaga-tudo");
const saveButton = document.getElementById("salvar-tarefas");
const removeFinished = document.getElementById("remover-finalizados");

const addItem = (event: Event, list: ToDoList) => {
	event.preventDefault();
	const task = new Task(input.value, list);
	list.addTask(task);
	list.renderList();
};

const list = new ToDoList();
lastButton.insertAdjacentElement("afterend", list.getLocalStorage());
addButton.addEventListener("click", (e: Event) => addItem(e, list));
deleteButton.addEventListener("click", list.reset);
saveButton.addEventListener("click", list.saveLocalStorage);
removeFinished.addEventListener("click", list.removeFinished);

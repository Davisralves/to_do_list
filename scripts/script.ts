const input = document.getElementsByTagName("input")[0];
const addTaskButton = document.getElementById("add-task");
const deleteButton = document.getElementById("apaga-tudo");
const saveButton = document.getElementById("salvar-tarefas");
const removeDoneTasksButton = document.getElementById("remover-finalizados");
const listDiv = document.getElementsByClassName("tasks")[0];

const addItem = (event: Event, list: ToDoList) => {
	event.preventDefault();
	const task = new Task(input.value, list);
	list.addTask(task);
	list.renderList();
};

const list = new ToDoList();
listDiv.appendChild(list.getLocalStorage());
saveButton.addEventListener("click", list.saveLocalStorage);
addTaskButton.addEventListener("click", (e: Event) => addItem(e, list));
deleteButton.addEventListener("click", list.reset);
removeDoneTasksButton.addEventListener("click", list.removeFinished)
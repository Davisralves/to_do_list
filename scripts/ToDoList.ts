class ToDoList {
	public tasks: Task[];
	public list: HTMLDivElement;

	constructor() {
		this.tasks = [];
		const div = document.createElement("div");
		const ul = document.createElement("ul");
		div.appendChild(ul);
		div.id = "lista-tarefas";
		this.list = div;
	}

	addTask(newTask: Task) {
		this.tasks.push(newTask);
	}

	renderList(): HTMLDivElement {
		this.tasks.forEach((task) => {
			console.log(task.name);
			let unorderedList = this.list.firstElementChild as HTMLUListElement;
			unorderedList.appendChild(task.element);
		});
		return this.list;
	}

	removeTask(task: Task) {
		const index = this.tasks.indexOf(task);
		this.tasks.splice(index, 1);    
		this.renderList();
	}
}

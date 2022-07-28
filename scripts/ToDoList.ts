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

	reset = () => {
		this.tasks.forEach((task) => {
			let ol = this.list.firstElementChild as HTMLElement;
			ol.removeChild(task.element);
		});
		this.tasks = [];
	};

	addTask(newTask: Task) {
		this.tasks.push(newTask);
	}

	renderList(): HTMLDivElement {
		this.tasks.forEach((task) => {
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

	saveLocalStorage = () => {
		const taskNames = this.tasks.map((task) => task.name);
		const taskNamesString = JSON.stringify(taskNames);
		localStorage.setItem("tasks", taskNamesString);
	};

	getLocalStorage = () => {
		const tasksNamesString = localStorage.getItem("tasks");
		if (tasksNamesString) {
			const tasksNames = JSON.parse(tasksNamesString);
			this.tasks = tasksNames.map(
				(taskName: string) => new Task(taskName, this)
			);
		}
		return this.renderList();
	};
}

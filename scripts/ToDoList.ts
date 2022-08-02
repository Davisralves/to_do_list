class ToDoList {
	public tasks: Task[];
	public list: HTMLDivElement;
	public dragElement: Task | null;
	public dropElement: Task | null;

	constructor() {
		this.tasks = [];
		const div = document.createElement("div");
		const ul = document.createElement("ul");
		div.appendChild(ul);
		div.id = "lista-tarefas";
		this.list = div;
		this.dragElement = null;
		this.dropElement = null;
	}

	getTaskByHtml = (element: HTMLElement) => {
		let searchTask;
		this.tasks.forEach((task) => {
			if (task.element === element) searchTask = task;
		});
		return searchTask;
	};

	swapDragElements() {
		if (this.dragElement && this.dropElement) {
			const indexOfDragElement = this.tasks.indexOf(this.dragElement);
			const indexoFDropElement = this.tasks.indexOf(this.dropElement);
			this.tasks[indexOfDragElement] = this.dropElement;
			this.tasks[indexoFDropElement] = this.dragElement;
			this.list = this.renderList();
		}
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

	removeFinished = () => {
		// this.tasks.length muda sempre que um elemento é removido
		const length = this.tasks.length;
		for (let index = 0; index < length; index += 1) {
			const actualTask = this.tasks[index - (length - this.tasks.length)];
			if (actualTask.element.className === "finished") {
				this.removeTask(actualTask);
				this.list.firstChild?.removeChild(actualTask.element);
			}
		}
	};

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

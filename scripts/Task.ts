class Button {
	public element: HTMLElement;
	constructor(
		public name: string,
		public method: Function,
		public type?: string
	) {
		const button = document.createElement("button");
		button.innerText = name;
		button.type = type || "button";
		button.id = name;
		button.onclick = function (e) {
			method(e);
		};
		this.element = button;
	}
}

export default class Task {
	public element: HTMLElement;
	public toDoList: ToDoList;
	constructor(public name: string, toDoList: ToDoList) {
		this.toDoList = toDoList;
		const li = document.createElement("li");
		li.innerText = name;
		this.element = li;
		this.appendButtons();
	}

	appendButtons() {
		this.element.appendChild(new Button("x", this.removeSelf).element);
		this.element.appendChild(new Button("Edit", this.editTask).element);
	};

	confirmTask = (event) => {
		event.preventDefault();
		const input = this.element.firstChild?.firstChild as HTMLInputElement;
		const newText = input.value;
		this.element.innerText = newText;
		this.name = newText;
		this.appendButtons();
	};

	editTask() {
		const confirmButton = new Button("Confirm", this.confirmTask, "submit")
			.element;
		const form = document.createElement("form");
		const input = document.createElement("input");
		input.value = this.name;
		this.element.innerText = "";
		form.appendChild(input);
		form.appendChild(confirmButton);
		this.element.appendChild(form);
	};

	removeSelf = (e) => {
		const documentList = e.target.parentNode.parentNode;
		this.toDoList.tasks.forEach((task) =>
			documentList.removeChild(task.element)
		);
		this.toDoList.removeTask(this);
	};
}

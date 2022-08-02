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
		this.element.onclick = this.setFinished;
		this.appendButtons();
	}

	setFinished = (event: Event) => {
		const element = event.target as HTMLElement;
		if (element.tagName === "LI") {
			if (this.element.className === "finished") {
				this.element.className = "";
			} else this.element.className = "finished";
		}
	};

	appendButtons() {
		const buttons = document.createElement("div");
		buttons.appendChild(new Button("x", this.removeSelf).element);
		buttons.appendChild(new Button("Edit", this.editTask).element);
		this.element.appendChild(buttons);
	}

	confirmTask = (event) => {
		event.preventDefault();
		const input = this.element.firstChild?.firstChild as HTMLInputElement;
		const newText = input.value;
		this.element.innerText = newText;
		this.name = newText;
		this.appendButtons();
	};

	editTask = () => {
		const confirmButton = new Button("Confirm", this.confirmTask, "submit")
			.element;
		confirmButton.style.display = "inline";
		const form = document.createElement("form");
		const input = document.createElement("input");
		input.value = this.name;
		this.element.innerText = "";
		form.appendChild(input);
		form.appendChild(confirmButton);
		this.element.appendChild(form);
	};

	removeSelf = (e) => {
		this.toDoList.list.firstChild?.removeChild(this.element);
		this.toDoList.removeTask(this);
	};
}

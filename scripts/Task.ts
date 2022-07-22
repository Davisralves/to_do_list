class Button {
	public element: HTMLElement;
	constructor(public name: string, public method: Function) {
		const button = document.createElement("button");
		button.innerText = name;
		button.type = "button";
		button.onclick = function (e) {
			method(e);
		};
		this.element = button;
	}
}

class Task {
	public element: HTMLElement;
	public toDoList: ToDoList;
	constructor(public name: string, toDoList: ToDoList) {
		this.toDoList = toDoList;
		const li = document.createElement("li");
		li.innerText = name;
		const deleteButton = new Button("Delete", this.removeSelf).element;
		li.appendChild(deleteButton);
		this.element = li;
	}

	editTask = (newTask: string) => {
		this.name = newTask;
	};

	removeSelf = (e) => {
		const actualList = e.target.parentNode.parentNode;
		this.toDoList.tasks.forEach((task) => actualList.removeChild(task.element));
		this.toDoList.removeTask(this);
	};
}

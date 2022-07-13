class Task {
	constructor(public name: string) {}

	editTask(newTask: string): void {
		this.name = newTask;
	}
}

class ToDoList {
	public tasks: Task[];

	constructor() {
		this.tasks = [];
	}

	addTask(newTask: Task) {
		this.tasks.push(newTask);
	}

	removeTask(task: Task) {
		const index = this.tasks.indexOf(task, 1);
		this.tasks.splice(index, 1);
	}
}

const list = new ToDoList();
const task1 = new Task("Wash car");
console.log("task:", task1);
console.log("list:", list);
list.addTask(task1);
list.addTask(task1);
console.log("list:", list);
list.removeTask(task1);
console.log("list:", list);

class Task {
	public name: string;
	public id: number;
	public element: HTMLElement;
	constructor(name: string) {
		this.name = name;
		const li = document.createElement("li");
		li.innerText = name;
		li.id = "0";
		this.element = li;
	}

	editTask(newTask: string): void {
		this.name = newTask;
	}
}

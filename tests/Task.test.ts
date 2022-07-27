import { JSDOM } from "jsdom";
import { Task } from "../scripts/Task";
import { ToDoList } from "../scripts/ToDoList";
const dom = new JSDOM();
global.document = dom.window.document;

describe("Test Task Class", () => {
	it("task class has the atribute name, element and toDoList", () => {
		const taskTest = new Task("task1", new ToDoList());
		expect(taskTest).toHaveProperty("name");
		expect(taskTest).toHaveProperty("element");
		expect(taskTest).toHaveProperty("toDoList");
	});
	it("task class has the name passed as parameter and element with his text", () => {
		const taskTest = new Task("task1", new ToDoList());
		expect(taskTest.name).toBe("task1");
		expect(taskTest.element.innerText).toBe("task1");
	});
	it("Class Task has the expected methods", () => {
		const taskTest = new Task("task1", new ToDoList());
		expect(taskTest).toHaveProperty("confirmTask");
		expect(taskTest).toHaveProperty("editTask");
		expect(taskTest).toHaveProperty("appendButtons");
		expect(taskTest).toHaveProperty("removeSelf");
	});
});

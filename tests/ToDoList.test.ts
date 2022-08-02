import { JSDOM } from "jsdom";
import ToDoList  from "../scripts/ToDoList";
import Task from "../scripts/Task";
const dom = new JSDOM();
global.document = dom.window._document;

describe("test class ToDoList", () => {
	it("has tasks and list Propertys", () => {
		const listTest = new ToDoList();
		expect(listTest).toHaveProperty("tasks");
		expect(listTest).toHaveProperty("list");
	});
	it("has addTask, removeTask and renderList methods", () => {
		const listTest = new ToDoList();
		expect(typeof listTest.addTask).toBe("function");
		expect(typeof listTest.removeTask).toBe("function");
		expect(typeof listTest.renderList).toBe("function");
	});
	it("addTask work as aspected", () => {
		const listTest = new ToDoList();
		listTest.addTask(new Task("Tarefa 1", listTest));
		expect(listTest.tasks).toHaveLength(1);
	});
	it("removeTask work as aspected", () => {
		const listTest = new ToDoList();
		const task1 = new Task("Tarefa 1", listTest);
		const task2 = new Task("Tarefa 2", listTest);
		listTest.addTask(task1);
		listTest.addTask(task2);
		expect(listTest.tasks).toHaveLength(2);
		listTest.removeTask(task1);
		expect(listTest.tasks).toHaveLength(1);
		listTest.removeTask(task2);
		expect(listTest.tasks).toHaveLength(0);
	});
});

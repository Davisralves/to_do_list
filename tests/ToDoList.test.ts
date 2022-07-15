import { JSDOM } from "jsdom";
import { ToDoList } from "../scripts/ToDoList";
const dom = new JSDOM();
global.document = dom.window.document;

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
});

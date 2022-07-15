import { JSDOM } from "jsdom";
import { Task } from "../scripts/Task";
const dom = new JSDOM();
global.document = dom.window.document;

describe("Test Task Class", () => {
	it("task class has the atribute name and element", () => {
		const taskTest = new Task("task1");
		expect(taskTest).toHaveProperty("name");
		expect(taskTest).toHaveProperty("element");
		expect(taskTest.element).toHaveProperty("id");
	});
	it("task class has the name passed as parameter and element with his text", () => {
		const taskTest = new Task("task1");
		expect(taskTest.name).toBe("task1");
		expect(taskTest.element.innerText).toBe("task1");
	});
	it("Element in Class Task has the id paramater equal 0 by default", () => {
		const taskTest = new Task("task1");
		expect(taskTest.element.id).toBe("0");
	});
});

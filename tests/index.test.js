const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(
	path.resolve("to_do_list", "../index.html"),
	"utf8"
);
const {
	getByRole,
	getByLabelText,
	fireEvent,
	MouseEvent,
	getByPlaceholderText,
} = require("@testing-library/dom");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
require("@testing-library/jest-dom");
let dom;
let container;
describe("index.html", () => {
	beforeEach(() => {
		// Constructing a new JSDOM with this option is the key
		// to getting the code in the script tag to execute.
		// This is indeed dangerous and should only be done with trusted content.
		// https://github.com/jsdom/jsdom#executing-scripts
		dom = new JSDOM(html, { runScripts: "dangerously" });
		container = dom.window.document.body;
	});
	describe("renders headings elements", () => {
		it("renders title", () => {
			expect(container.querySelector("h1")).not.toBeNull();
			expect(
				getByRole(container, "heading", { name: "Lista de Tarefas", level: 1 })
			).toBeInTheDocument();
		});
		it("renders subtitle", () => {
			expect(container.querySelector("h3")).not.toBeNull();
			expect(
				getByRole(container, "heading", {
					name: "Clique em um item para marcá-lo como finalizado",
					level: 3,
				})
			).toBeInTheDocument();
		});
	});
	describe("render button elements", () => {
		it("render 5 buttons", () => {
			expect(container.querySelectorAll("button")).toHaveLength(4);
		});
		it('render "Add task" button', () => {
			expect(
				getByRole(container, "button", { name: "Criar tarefa" })
			).toBeInTheDocument();
		});
		it('render "Remove ended tasks" button', () => {
			expect(
				getByRole(container, "button", { name: "Remover finalizados" })
			).toBeInTheDocument();
		});
		it('render "Delete all" button', () => {
			expect(
				getByRole(container, "button", { name: "Apagar tudo" })
			).toBeInTheDocument();
		});
		it('render "Save" button', () => {
			expect(
				getByRole(container, "button", { name: "Salvar" })
			).toBeInTheDocument();
		});
	});
	describe("test input and label elements", () => {
		it("render Describe Task input and label elements", () => {
			expect(
				getByPlaceholderText(container, "Digite uma tarefa")
			).toBeInTheDocument();
		});
	});
});

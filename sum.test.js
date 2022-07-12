const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(
	path.resolve("to_do_list", "../index.html"),
	"utf8"
);
const { getByText } = require("@testing-library/dom");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
require("@testing-library/jest-dom")
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
	it("renders a heading element", () => {
		expect(container.querySelector("h3")).not.toBeNull();
		expect(getByText(container, "Lista de Tarefas")).toBeInTheDocument();
	});
});

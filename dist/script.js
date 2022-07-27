var Button = /** @class */ (function () {
    function Button(name, method, type) {
        this.name = name;
        this.method = method;
        this.type = type;
        var button = document.createElement("button");
        button.innerText = name;
        button.type = type || "button";
        button.id = name;
        button.onclick = function (e) {
            method(e);
        };
        this.element = button;
    }
    return Button;
}());
var Task = /** @class */ (function () {
    function Task(name, toDoList) {
        var _this = this;
        this.name = name;
        this.appendButtons = function () {
            _this.element.appendChild(new Button("x", _this.removeSelf).element);
            _this.element.appendChild(new Button("Edit", _this.editTask).element);
        };
        this.confirmTask = function (event) {
            var _a;
            event.preventDefault();
            var input = (_a = _this.element.firstChild) === null || _a === void 0 ? void 0 : _a.firstChild;
            var newText = input.value;
            _this.element.innerText = newText;
            _this.name = newText;
            _this.appendButtons();
        };
        this.editTask = function () {
            var confirmButton = new Button("Confirm", _this.confirmTask, "submit")
                .element;
            var form = document.createElement("form");
            var input = document.createElement("input");
            input.value = _this.name;
            _this.element.innerText = "";
            form.appendChild(input);
            form.appendChild(confirmButton);
            _this.element.appendChild(form);
        };
        this.removeSelf = function (e) {
            var documentList = e.target.parentNode.parentNode;
            _this.toDoList.tasks.forEach(function (task) {
                return documentList.removeChild(task.element);
            });
            _this.toDoList.removeTask(_this);
        };
        this.toDoList = toDoList;
        var li = document.createElement("li");
        li.innerText = name;
        this.element = li;
        this.appendButtons();
    }
    return Task;
}());
var ToDoList = /** @class */ (function () {
    function ToDoList() {
        var _this = this;
        this.reset = function () {
            _this.tasks.forEach(function (task) {
                var ol = _this.list.firstElementChild;
                ol.removeChild(task.element);
            });
            _this.tasks = [];
        };
        this.tasks = [];
        var div = document.createElement("div");
        var ul = document.createElement("ul");
        div.appendChild(ul);
        div.id = "lista-tarefas";
        this.list = div;
    }
    ToDoList.prototype.addTask = function (newTask) {
        this.tasks.push(newTask);
    };
    ToDoList.prototype.renderList = function () {
        var _this = this;
        this.tasks.forEach(function (task) {
            var unorderedList = _this.list.firstElementChild;
            unorderedList.appendChild(task.element);
        });
        return this.list;
    };
    ToDoList.prototype.removeTask = function (task) {
        var index = this.tasks.indexOf(task);
        this.tasks.splice(index, 1);
        this.renderList();
    };
    return ToDoList;
}());
var input = document.getElementsByTagName("input")[0];
var lastButton = document.getElementById("salvar-tarefas");
var addButton = document.getElementById("add-task");
var deleteButton = document.getElementById("apaga-tudo");
var addItem = function (event, list) {
    event.preventDefault();
    var task = new Task(input.value, list);
    list.addTask(task);
    list.renderList();
};
var list = new ToDoList();
lastButton.insertAdjacentElement("afterend", list.renderList());
addButton.addEventListener("click", function (e) { return addItem(e, list); });
deleteButton.addEventListener("click", list.reset);

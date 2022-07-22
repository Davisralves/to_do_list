var Button = /** @class */ (function () {
    function Button(name, method) {
        this.name = name;
        this.method = method;
        var button = document.createElement("button");
        button.innerText = name;
        button.type = "button";
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
        this.editTask = function (newTask) {
            _this.name = newTask;
        };
        this.removeSelf = function (e) {
            var actualList = e.target.parentNode.parentNode;
            _this.toDoList.tasks.forEach(function (task) { return actualList.removeChild(task.element); });
            _this.toDoList.removeTask(_this);
        };
        this.toDoList = toDoList;
        var li = document.createElement("li");
        li.innerText = name;
        var deleteButton = new Button("Delete", this.removeSelf).element;
        li.appendChild(deleteButton);
        this.element = li;
    }
    return Task;
}());
var ToDoList = /** @class */ (function () {
    function ToDoList() {
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
            console.log(task.name);
            var unorderedList = _this.list.firstElementChild;
            unorderedList.appendChild(task.element);
        });
        return this.list;
    };
    ToDoList.prototype.removeTask = function (task) {
        console.log(task);
        var index = this.tasks.indexOf(task);
        this.tasks.splice(index, 1);
        this.renderList();
        return index;
    };
    return ToDoList;
}());
var input = document.getElementsByTagName("input")[0];
var lastButton = document.getElementById("salvar-tarefas");
var addButton = document.getElementById("add-task");
var addItem = function (event, list) {
    event.preventDefault();
    var task = new Task(input.value, list);
    console.log(task);
    console.log(task.toDoList);
    list.addTask(task);
    list.renderList();
};
var list = new ToDoList();
lastButton.insertAdjacentElement("afterend", list.renderList());
addButton.addEventListener("click", function (e) { return addItem(e, list); });

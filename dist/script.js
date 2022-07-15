var Task = /** @class */ (function () {
    function Task(name) {
        this.name = name;
        var li = document.createElement("li");
        li.innerText = name;
        li.id = "0";
        this.element = li;
    }
    Task.prototype.editTask = function (newTask) {
        this.name = newTask;
    };
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
        this.tasks.forEach(function (task, index) {
            task.id = index;
            _this.list.firstElementChild.appendChild(task.element);
        });
        return this.list;
    };
    ToDoList.prototype.removeTask = function (task) {
        var index = this.tasks.indexOf(task, 1);
        this.tasks.splice(index, 1);
    };
    return ToDoList;
}());
var input = document.getElementsByTagName("input")[0];
var lastButton = document.getElementById("salvar-tarefas");
var addButton = document.getElementById("add-task");
var addItem = function (event, list) {
    event.preventDefault();
    var task = new Task(input.value);
    list.addTask(task);
    console.log(list);
    list.renderList();
};
var list = new ToDoList();
lastButton.insertAdjacentElement("afterend", list.renderList());
addButton.addEventListener("click", function (e) { return addItem(e, list); });

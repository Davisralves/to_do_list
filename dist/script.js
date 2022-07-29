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
        this.setFinished = function () {
            if (_this.element.className === "finished") {
                return (_this.element.className = "");
            }
            else
                _this.element.className = "finished";
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
            confirmButton.style.display = "inline";
            var form = document.createElement("form");
            var input = document.createElement("input");
            input.value = _this.name;
            _this.element.innerText = "";
            form.appendChild(input);
            form.appendChild(confirmButton);
            _this.element.appendChild(form);
        };
        this.removeSelf = function (e) {
            var _a;
            (_a = _this.toDoList.list.firstChild) === null || _a === void 0 ? void 0 : _a.removeChild(_this.element);
            _this.toDoList.removeTask(_this);
        };
        this.toDoList = toDoList;
        var li = document.createElement("li");
        li.innerText = name;
        this.element = li;
        this.element.onclick = this.setFinished;
        this.appendButtons();
    }
    Task.prototype.appendButtons = function () {
        var buttons = document.createElement("div");
        buttons.appendChild(new Button("x", this.removeSelf).element);
        buttons.appendChild(new Button("Edit", this.editTask).element);
        this.element.appendChild(buttons);
    };
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
        this.removeFinished = function () {
            var _a;
            // this.tasks.length muda sempre que um elemento é removido
            var length = _this.tasks.length;
            for (var index = 0; index < length; index += 1) {
                var actualTask = _this.tasks[index - (length - _this.tasks.length)];
                if (actualTask.element.className === "finished") {
                    _this.removeTask(actualTask);
                    (_a = _this.list.firstChild) === null || _a === void 0 ? void 0 : _a.removeChild(actualTask.element);
                }
            }
        };
        this.saveLocalStorage = function () {
            var taskNames = _this.tasks.map(function (task) { return task.name; });
            var taskNamesString = JSON.stringify(taskNames);
            localStorage.setItem("tasks", taskNamesString);
        };
        this.getLocalStorage = function () {
            var tasksNamesString = localStorage.getItem("tasks");
            if (tasksNamesString) {
                var tasksNames = JSON.parse(tasksNamesString);
                _this.tasks = tasksNames.map(function (taskName) { return new Task(taskName, _this); });
            }
            return _this.renderList();
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
var addTaskButton = document.getElementById("add-task");
var deleteButton = document.getElementById("apaga-tudo");
var saveButton = document.getElementById("salvar-tarefas");
var removeDoneTasksButton = document.getElementById("remover-finalizados");
var listDiv = document.getElementsByClassName("tasks")[0];
var addItem = function (event, list) {
    event.preventDefault();
    var task = new Task(input.value, list);
    list.addTask(task);
    list.renderList();
};
var list = new ToDoList();
listDiv.appendChild(list.getLocalStorage());
saveButton.addEventListener("click", list.saveLocalStorage);
addTaskButton.addEventListener("click", function (e) { return addItem(e, list); });
deleteButton.addEventListener("click", list.reset);
removeDoneTasksButton.addEventListener("click", list.removeFinished);

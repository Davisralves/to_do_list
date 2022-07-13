var Task = /** @class */ (function () {
    function Task(name) {
        this.name = name;
    }
    Task.prototype.editTask = function (newTask) {
        this.name = newTask;
    };
    return Task;
}());
var ToDoList = /** @class */ (function () {
    function ToDoList() {
        this.tasks = [];
    }
    ToDoList.prototype.addTask = function (newTask) {
        this.tasks.push(newTask);
    };
    ToDoList.prototype.removeTask = function (task) {
        var index = this.tasks.indexOf(task, 1);
        this.tasks.splice(index, 1);
    };
    return ToDoList;
}());
var list = new ToDoList();
var task1 = new Task("Wash car");
console.log("task:", task1);
console.log("list:", list);
list.addTask(task1);
list.addTask(task1);
console.log("list:", list);
list.removeTask(task1);
console.log("list:", list);
//# sourceMappingURL=script.js.map
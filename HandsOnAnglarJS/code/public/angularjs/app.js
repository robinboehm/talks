var app = angular.module('todomvc', ['ngResource']);

app.factory('ToDoService', function ($resource) {
    return $resource('/todos/:id', { id:'@id' }, { update:{method:'PUT' }})
});

app.controller('TodoCtrl', function ($scope, ToDoService) {
    var todos = $scope.todos = ToDoService.query();

    $scope.createTodo = function (newTodo) {
        if (!newTodo.length) { return };

        var todo = { title: newTodo.trim(), completed: false };
        ToDoService.save(todo)
            .then(function (todo) {
                todos.push(todo);
            });
        $scope.newTodo = '';
    };

    $scope.editTodo = function (todo) {
        $scope.editedTodo = todo;
    };

    $scope.updateTodo = function (todo) {
        $scope.editedTodo = null;
        ToDoService.save(todo);
    }

    $scope.removeTodo = function (todo) {
        todos.splice(todos.indexOf(todo), 1);
        ToDoService.delete(todo);
    };

});

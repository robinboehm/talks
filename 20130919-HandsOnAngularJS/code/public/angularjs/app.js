var app = angular.module('todomvc', ['ngResource']);

/*
 $resource is a wrapper for communicating with a CRUD Backend
 */
app.factory('ToDoService', function ($resource) {
    return $resource('/todos/:id', { id:'@id' }, { update:{method:'PUT' }})
});

app.controller('TodoCtrl', function ($scope, ToDoService) {
    // Fetch the initial list from the server
    var todos = $scope.todos = ToDoService.query();

    $scope.createTodo = function (newTodo) {
        if (!newTodo.length) { return };

        // Create simple model for the backend
        var todo = { title: newTodo.trim(), completed: false };

        // Save model to the backend
        ToDoService.save(todo)
            .$then(function (response) {
                todos.push(response.data);
            });
        // Clear the ViewModel
        $scope.newTodo = '';
    };


    $scope.editTodo = function (todo) {
        $scope.editedTodo = todo;
    };

    $scope.updateTodo = function (todo) {
        $scope.editedTodo = null;
        // Save model to the Backend
        ToDoService.save(todo);
    }

    $scope.removeTodo = function (todo) {
        // Delete from local array
        todos.splice(todos.indexOf(todo), 1);
        // Send deletion to the backend
        ToDoService.delete(todo);
    };

});

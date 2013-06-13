'use strict';

var app = angular.module('todomvc', ['ngResource']);

app.factory('ToDoService', function ($resource) {
    return $resource('/todos/:id', { id:'@id' }, {update:{method:'PUT' }})
});

app.controller('TodoCtrl', ['$scope','filterFilter','ToDoService'
                ,function ($scope, filterFilter, ToDoService) {
    var todos = $scope.todos = ToDoService.query();

    $scope.newTodo = '';
    $scope.editedTodo = null;


    $scope.addTodo = function (newTodo) {
        if (!newTodo.length) {
            return;
        }

        var todo = {
            title:newTodo.trim(),
            completed:false
        };
        todos.push(todo);
        ToDoService.save(todo)
            .then();

        $scope.newTodo = '';
    };

    $scope.editTodo = function (todo) {
        $scope.editedTodo = todo;
    };

    $scope.doneEditing = function (todo) {
        $scope.editedTodo = null;
        $scope.updateTodo(todo);

    };

    $scope.updateTodo = function (todo) {
        if (!todo.title) {
            $scope.removeTodo(todo);
        } else {
            ToDoService.save(todo);
        }
    }

    $scope.removeTodo = function (todo) {
        todos.splice(todos.indexOf(todo), 1);
        ToDoService.delete(todo);
    };

});

'use strict';

var app = angular.module('todomvc', ['ngResource']);

app.factory('Todo', function($resource) {
  return $resource('/todos/:id', { id: '@id' }, {update: {method: 'PUT' }})
});

app.controller('TodoCtrl', function($scope, $location, filterFilter, Todo) {
  var todos = $scope.todos = Todo.query();

  $scope.newTodo = '';
  $scope.editedTodo = null;

  $scope.$watch('todos', function () {
    $scope.remainingCount = filterFilter(todos, { completed: false }).length;
    $scope.completedCount = todos.length - $scope.remainingCount;
    $scope.allChecked = !$scope.remainingCount;
  }, true);

  if ($location.path() === '') {
    $location.path('/');
  }

  $scope.location = $location;

  $scope.$watch('location.path()', function (path) {
    $scope.statusFilter = (path === '/active') ?
      { completed: false } : (path === '/completed') ?
      { completed: true } : null;
  });

  $scope.addTodo = function () {
    var newTodo = $scope.newTodo.trim();
    if (!newTodo.length) {
      return;
    }
    todos.push({ title: newTodo, completed: false });
    Todo.save({ title: newTodo, completed: false });
    $scope.newTodo = '';
  };

  $scope.editTodo = function (todo) {
    $scope.editedTodo = todo;
  };

  $scope.doneEditing = function (todo) {
    $scope.editedTodo = null;
    todo.title = todo.title.trim();

    if (!todo.title) {
      $scope.removeTodo(todo);
    } else {
      Todo.save(todo);
    }
  };

  $scope.updateTodo = function (todo) {

  }

  $scope.removeTodo = function (todo) {
    todos.splice(todos.indexOf(todo), 1);
    Todo.delete(todo);
  };

  $scope.clearCompletedTodos = function () {
    $scope.todos = todos = todos.filter(function (val) {
      return !val.completed;
    });
  };

  $scope.markAll = function (completed) {
    todos.forEach(function (todo) {
      todo.completed = completed;
    });
  };
});

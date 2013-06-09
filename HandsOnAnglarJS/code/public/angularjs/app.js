'use strict';

var todomvc = angular.module('todomvc', ['ngResource']);

todomvc.factory('todoStorage', function () {
  var STORAGE_ID = 'todos-angularjs';

  return {
    get: function () {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    },

    put: function (todos) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
    }
  };
});



todomvc.factory('Todo', function($resource) {
  return $resource('/todos/:id', { id: '@id' }, {update: {method: 'PUT' }})
});

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('TodoCtrl', function($scope, $location, todoStorage, filterFilter, Todo) {
  var todos = $scope.todos = Todo.query();

  $scope.newTodo = '';
  $scope.editedTodo = null;

  $scope.$watch('todos', function () {
    $scope.remainingCount = filterFilter(todos, { completed: false }).length;
    $scope.completedCount = todos.length - $scope.remainingCount;
    $scope.allChecked = !$scope.remainingCount;
    todoStorage.put(todos);
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

    todos.push({
      title: newTodo,
      completed: false
    });

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
    }
  };

  $scope.removeTodo = function (todo) {
    todos.splice(todos.indexOf(todo), 1);
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
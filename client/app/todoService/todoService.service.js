'use strict';

angular.module('offlineRestApp')
  .service('todoService', function () {

    var todos = [];

    var service = {};

    service.addTodo = function(todoText) {
      todos.push({text: todoText, complete: false});
    };

    service.getTodos = function() {
      return todos;
    };

    return service;
  });

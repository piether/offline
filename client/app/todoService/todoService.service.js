'use strict';

angular.module('offlineRestApp')
  .service('todoService', function ($http) {

    var todos = [];

    var service = {};

    service.addTodo = function(todoText) {
      var todo = {text: todoText, complete: false};
      todos.push(todo);
      $http.post('/api/user/default/todos', todo).success(function(response) {
        console.log(response.id);
        todo.id = response.id;
      });
    };

    service.updateTodo = function(todo) {
      if(!_.isNumber(todo.id)) {
        throw "can't update without id!";
      }
      $http.put('/api/user/default/todos/'+todo.id, todo);
    };

    service.getTodos = function() {
      return todos;
    };

    return service;
  });

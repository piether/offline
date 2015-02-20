'use strict';

angular.module('offlineRestApp')
  .service('todoService', function ($http, $q) {

    var todos = [];
    var online;

    var service = {};

    service.addTodo = function(todoText) {
      var todo = {text: todoText, complete: false};
      todos.push(todo);
      if(online) {
        return $http.post('/api/user/default/todos', todo).success(function(response) {
          console.log(response.id);
          todo.id = response.id;
        });
      }
    };

    service.updateTodo = function(todo) {
      if(online) {
        if(!_.isNumber(todo.id)) {
          throw "can't update without id!";
        }
        return $http.put('/api/user/default/todos/'+todo.id, todo);
      }
    };

    service.getTodos = function() {
      if(online) {
        fetchTodos();
      }
      return todos;
    };

    var fetchTodos = function() {
      $http.get('/api/user/default/todos').success(function(fetchedTodos) {
        _.each(fetchedTodos, function(todo) {
          todos.push(todo);
        });
      });
    };

    service.setOnline = function(newOnline) {
      online = newOnline;
      if(online) {
        syncWithServer();
      }
    };

    var syncWithServer = function() {
      function syncUpdates() {
        return $q.all(
        _.map(todos,function(todo) {
          if(_.isNumber(todo.id)) {
            return service.updateTodo(todo);
          } else {
            return service.addTodo(todo.text);
          }
        })
        );
      }

      syncUpdates().then(function() {
        todos.length = 0 ;
        fetchTodos();
      })

    };

    return service;
  });

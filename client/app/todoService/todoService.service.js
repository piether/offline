'use strict';

angular.module('offlineRestApp')
  .service('todoService', function ($http, $q, $window) {

    var restore = function() {
      var data = $window.localStorage.getItem("todos");
      if(data) {
        return JSON.parse(data);
      } else {
        return [];
      }
    };

    var todos = restore();

    var online;

    var service = {};

    var date = '20-10-2014';

    service.addTodo = function(todoText) {
      createTodo({text: todoText, complete: false});
    };

    var createTodo = function(todo) {
      todos.push(todo);
      if(online) {
        return $http.post('/api/'+date+'/todos', todo).success(function(response) {
          todo.id = response.id;
        });
      }
      persist();
    }

    service.updateTodo = function(todo) {
      if(online) {
        if(!_.isNumber(todo.id)) {
          throw "can't update without id!";
        }
        return $http.put('/api/'+date+'/todos/'+todo.id, todo);
      }
      persist();
    };

    service.getTodos = function() {
      if(online) {
        fetchTodos();
      }
      return todos;
    };

    var fetchTodos = function() {
      return $http.get('/api/'+date+'/todos').success(function(fetchedTodos) {
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
            return createTodo(todo);
          }
        })
        );
      }

      syncUpdates().then(function() {
        todos.length = 0 ;
        fetchTodos().then(function() {
          persist();
        });
      });

    };

    var persist = function() {
      $window.localStorage.setItem("todos",JSON.stringify(todos));
    };

    return service;
  });

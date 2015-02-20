'use strict';

angular.module('offlineRestApp')
  .controller('UserCtrl', function ($scope, todoService) {
    $scope.todos = todoService.getTodos();

    $scope.addTodo = function() {
      todoService.addTodo($scope.newTodo);
      $scope.newTodo = '';
    };

    $scope.keypressCallback = function($event) {
      alert('Voila!');
      $event.preventDefault();
    };
  });

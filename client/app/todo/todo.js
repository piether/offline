'use strict';

angular.module('offlineRestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('todo', {
        url: '/todo',
        templateUrl: 'app/todo/todo.html',
        controller: 'TodoCtrl'
      });
  });
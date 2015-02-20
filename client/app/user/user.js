'use strict';

angular.module('offlineRestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/',
        templateUrl: 'app/user/user.html',
        controller: 'UserCtrl'
      });
  });

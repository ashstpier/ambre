angular.module('ambre', ['mixtapeController', 'mixtapeService', 'ngRoute'])

  .config(function($routeProvider) {
    $routeProvider

      .when('/', {
        templateUrl : '../views/mixtapes/new.html',
        controller  : 'mixtapeController'
      })

      .when('/', {
        templateUrl : '../views/mixtapes/new.html',
        controller  : 'mixtapeController'
      })

      .when('/user/mixtapes', {
        templateUrl : '../views/user/mixtapes.html',
        controller  : 'mixtapeController'
      })
  });
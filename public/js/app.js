angular.module('ambre', ['createMixtape', 'addTracks', 'userMixtapes', 'mixtapeService', 'ngRoute', 'ngCookies'])

  .config(function($routeProvider) {
    $routeProvider

      .when('/', {
        templateUrl : '../views/mixtapes/createmixtape.html',
        controller  : 'createMixtape'
      })

      .when('/mixtape/new', {
        templateUrl : '../views/mixtapes/createmixtape.html',
        controller  : 'createMixtape'
      })

      .when('/mixtape/tracks', {
        templateUrl : '../views/mixtapes/addtracks.html',
        controller  : 'addTracks'
      })

      .when('/user/mixtapes', {
        templateUrl : '../views/user/mixtapes.html',
        controller  : 'userMixtapes'
      })
  });
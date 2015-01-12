angular.module('ambre', ['chooseBook', 'addSongs', 'userSoundtracks', 'allSoundtracks', 'services', 'main', 'ngRoute', 'ngCookies'])

  .config(function($routeProvider) {
    $routeProvider

      .when('/', {
        templateUrl : '../views/soundtracks/all.html',
        controller  : 'allSoundtracks'
      })

      .when('/new/book', {
        templateUrl : '../views/new/book.html',
        controller  : 'chooseBook'
      })

      .when('/new/songs', {
        templateUrl : '../views/new/songs.html',
        controller  : 'addSongs'
      })

      .when('/user/soundtracks', {
        templateUrl : '../views/user/soundtracks.html',
        controller  : 'userSoundtracks'
      })
  });
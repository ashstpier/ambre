angular.module('ambre',
  [
    'chooseBook',
    'addSongs',
    'userPlaylists',
    'allPlaylists',
    'onePlaylist',
    'services',
    'main',
    'ngRoute',
    'ngCookies'
  ])

  .config(function($routeProvider) {
    $routeProvider

      .when('/', {
        templateUrl : '../views/playlists/all.html',
        controller  : 'allPlaylists'
      })

      .when('/playlist', {
        templateUrl : '../views/playlists/all.html',
        controller  : 'allPlaylists'
      })

      .when('/playlist/:playlist_id', {
        templateUrl : '../views/playlists/one.html',
        controller  : 'onePlaylist'
      })

      .when('/new/book', {
        templateUrl : '../views/new/book.html',
        controller  : 'chooseBook'
      })

      .when('/new/songs', {
        templateUrl : '../views/new/songs.html',
        controller  : 'addSongs'
      })

      .when('/user/playlists', {
        templateUrl : '../views/user/playlists.html',
        controller  : 'userPlaylists'
      })
  })
  .filter('cut', function () {
    return function (value, wordwise, max, tail) {
      if (!value) return '';

      max = parseInt(max, 10);
      if (!max) return value;
      if (value.length <= max) return value;

      value = value.substr(0, max);
      if (wordwise) {
          var lastspace = value.lastIndexOf(' ');
          if (lastspace != -1) {
              value = value.substr(0, lastspace);
          }
      }

      return value + (tail || ' …');
    };
    });
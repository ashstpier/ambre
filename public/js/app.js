angular.module('ambre',
  [
    'addSongs',
    'userPlaylists',
    'allPlaylists',
    'books',
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

      .when('/songs', {
        templateUrl : '../views/search/songs.html',
        controller  : 'addSongs'
      })

      .when('/playlists/:playlist_id', {
        templateUrl : '../views/playlists/one.html',
        controller  : 'onePlaylist'
      })

      .when('/books/:search_term', {
        templateUrl : '../views/search/books.html',
        controller  : 'books'
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

      return value.trim() + (tail || ' …');
    };
  });
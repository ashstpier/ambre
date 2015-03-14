angular.module('ambre',
  [
    'books',
    'songs',
    'allPlaylists',
    'onePlaylist',
    'oneBook',
    'userPlaylists',
    'usersPlaylists',
    'services',
    'main',
    'ngRoute',
    'ngCookies'
  ])

  .config(function($routeProvider) {
    $routeProvider

      .when('/', {
        templateUrl : '../views/home.html',
        controller  : 'allPlaylists'
      })

      .when('/playlists/:playlist_id', {
        templateUrl : '../views/playlists/one.html',
        controller  : 'onePlaylist'
      })

      .when('/books/:book_id', {
        templateUrl : '../views/books/one.html',
        controller  : 'oneBook'
      })

      .when('/songs/search', {
        templateUrl : '../views/search/songs.html',
        controller  : 'songs'
      })

      .when('/books/search/:search_term', {
        templateUrl : '../views/search/books.html',
        controller  : 'books'
      })

      .when('/users/:user_id', {
        templateUrl : '../views/users/playlists.html',
        controller  : 'usersPlaylists'
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
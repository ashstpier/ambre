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
  });
angular.module('main', [])
  .controller('main', function($scope, $http, Soundtrack, Spotify) {

    $scope.downloadPlaylist = function(soundtrack) {
      Spotify.download(soundtrack)
        .success(function(data) {
          window.open('https://open.spotify.com/user/' + data.owner.id + '/playlist/' + data.id);
        });
    };

    $scope.deleteSoundtrack = function(id) {
      Soundtrack.delete(id)
        .success(function(data) {
          $scope.soundtrack = data;
        });
    };
  });
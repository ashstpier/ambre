angular.module('userMixtapes', [])
  .controller('userMixtapes', function($scope, $http, $window, Mixtapes, User) {

    User.get()
      .success(function(data) {
        $scope.mixtapes = data;
      });

    $scope.downloadPlaylist = function(mixtape) {
      $http.post('/spotify/createplaylist', mixtape)
        .success(function(data) {
          window.open('https://open.spotify.com/user/' + data.owner.id + '/playlist/' + data.id);
        });
    };

    $scope.deleteMixtape = function(id) {
      Mixtapes.delete(id)
        .success(function(data) {
          $scope.mixtapes = data;
        });
    };
  });
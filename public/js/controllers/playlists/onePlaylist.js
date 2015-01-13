angular.module('onePlaylist', [])
  .controller('onePlaylist', function($scope, $routeParams, Soundtrack) {

    Soundtrack.getOne($routeParams.playlist_id)
      .success(function(data) {
        $scope.playlist = data;
      });

  });
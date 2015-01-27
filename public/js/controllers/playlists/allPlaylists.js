angular.module('allPlaylists', [])
  .controller('allPlaylists', function($scope, Soundtrack) {

    Soundtrack.getAll()
      .success(function(data) {
        $scope.playlists = data;
      });

  });
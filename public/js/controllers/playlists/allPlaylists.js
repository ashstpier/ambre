angular.module('allPlaylists', [])
  .controller('allPlaylists', function($scope, Soundtrack) {

    $scope.predicate = "createdAt";
    $scope.reverse = true;

    Soundtrack.getAll()
      .success(function(data) {
        $scope.playlists = data;
      });

  });
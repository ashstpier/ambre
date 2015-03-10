angular.module('userPlaylists', [])
  .controller('userPlaylists', function($scope, User, Soundtrack) {

    User.get()
      .success(function(data) {
        $scope.playlists = data.rows;
      });

    $scope.selectPlaylist = function(id) {
      $scope.delete_id = id;
    };

    $scope.deletePlaylist = function(id) {
      Soundtrack.delete(id)
        .success(function(data) {
          $scope.playlists = data;
        });
    };
  });
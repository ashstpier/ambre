angular.module('userPlaylists', [])
  .controller('userPlaylists', function($scope, UserPlaylist, Soundtrack) {

    UserPlaylist.get()
      .success(function(data) {
        $scope.playlists = data;
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
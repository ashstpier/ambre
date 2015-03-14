angular.module('usersPlaylists', [])
  .controller('usersPlaylists', function($scope, $routeParams, UserPlaylist) {

    $scope.username = $routeParams.user_id

    UserPlaylist.getOne($routeParams.user_id)
      .success(function(data) {
        $scope.playlists = data;
        console.log($scope.playlists)
      });
  });
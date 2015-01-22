angular.module('main', [])
  .controller('main', function($scope, $http, $location, Spotify) {

    $scope.downloadPlaylist = function(soundtrack) {
      Spotify.download(soundtrack)
        .success(function(data) {
          window.open('https://open.spotify.com/user/' + data.owner.id + '/playlist/' + data.id);
        });
    };

    $scope.isActive = function(path) {
      if ($location.path().substr(0, path.length) == path) {
        return "active"
      } else {
        return ""
      }
    }

    $scope.submit = function() {
      if ($scope.search) {
        $location.path('/books/' + $scope.search);
      }
    };

  });
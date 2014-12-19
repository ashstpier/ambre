var ambre = angular.module('ambre', []);

function mainController($scope, $http) {

  $http.get('/api/playlists')
    .success(function(data) {
      $scope.playlists = data;
      console.log(data)
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
}

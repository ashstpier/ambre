angular.module('createMixtape', [])
  .controller('createMixtape', function($scope, $http, $location, $cookieStore, Mixtapes, CurrentMixtape) {
    $scope.mixtape = {};
    $scope.formData = {};

    $scope.createMixtape = function() {
      if (!$.isEmptyObject($scope.formData)) {

        $scope.mixtape = {
          title: $scope.formData.title,
          description: $scope.formData.description
        };

        $http.post('/spotify/createplaylist', $scope.mixtape)
          .success(function(data) {

            $scope.mixtape.playlist_id = data.id;

            CurrentMixtape.set($scope.mixtape);
            $location.path('/mixtape/tracks');

          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      }
    };
  });
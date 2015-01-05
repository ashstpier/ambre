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

        CurrentMixtape.set($scope.mixtape);
        $location.path('/mixtape/tracks');
      }
    };
  });
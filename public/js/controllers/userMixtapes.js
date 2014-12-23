angular.module('userMixtapes', [])
  .controller('userMixtapes', function($scope, $http, Mixtapes, User) {

    User.get()
      .success(function(data) {
        $scope.mixtapes = data;
      });

    $scope.deleteMixtape = function(id) {
      Mixtapes.delete(id)
        .success(function(data) {
          $scope.mixtapes = data;
        });
    };
  });
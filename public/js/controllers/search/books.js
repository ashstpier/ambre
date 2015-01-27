angular.module('books', [])
  .controller('books', function($scope, $routeParams, $location, GoogleBooks, CurrentSoundtrack) {

    $scope.search_term = $routeParams.search_term;

    GoogleBooks.search($routeParams.search_term)
      .success(function(data) {
        $scope.search_results = data;
      });
  });
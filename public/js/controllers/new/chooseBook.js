angular.module('chooseBook', [])
  .controller('chooseBook', function($scope, $location, Book, GoogleBooks, CurrentBook) {
    $scope.book = {};

    $scope.searchBook = function(term) {
      GoogleBooks.search(term)
        .success(function(data) {
          $scope.search_results = data;
        });
    };

    $scope.chooseBook = function(book) {
      $scope.book = book;
    };

    $scope.saveBook = function() {

      CurrentBook.set($scope.book);
      $location.path('/new/songs');
    };

  });
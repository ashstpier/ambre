angular.module('chooseBook', [])
  .controller('chooseBook', function($scope, $location, Book, GoogleBooks, CurrentSoundtrack) {
    $scope.formData = {};

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
      if($scope.formData != null){
        $scope.soundtrack = {
          title: $scope.formData.title,
          description: $scope.formData.description
        }
        CurrentSoundtrack.set({book: $scope.book, soundtrack: $scope.soundtrack});
        $location.path('/new/songs');
      }


    };

  });
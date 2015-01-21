angular.module('chooseBook', [])
  .controller('chooseBook', function($scope, $location, Book, GoogleBooks, CurrentSoundtrack) {
    $scope.formData = {};

    GoogleBooks.search('best+seller')
      .success(function(data) {
        $scope.search_results = data;
      });

    $scope.searchBook = function(term) {
      GoogleBooks.search(term)
        .success(function(data) {
          $scope.search_results = data;
          console.log(data)
        });
    };

    $scope.chooseBook = function(book) {
      $scope.book = {
        id : book.id,
        title : book.title,
        author : book.authors[0],
        thumbnail : book.thumbnail
      }
      // $scope.book = {
      //   id : book.id[0]._,
      //   title : book.best_book[0].title[0],
      //   author : book.best_book[0].author[0].name[0],
      //   thumbnail : book.best_book[0].image_url[0]
      // }
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
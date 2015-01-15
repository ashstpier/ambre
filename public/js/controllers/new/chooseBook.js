angular.module('chooseBook', [])
  .controller('chooseBook', function($scope, $location, Book, GoogleBooks, CurrentSoundtrack) {
    $scope.formData = {};

    $scope.searchBook = function(term) {
      GoogleBooks.search(term)
        .success(function(data) {
          // var books = [];
          // for(book of data){
          //   if(book.best_book[0].image_url[0] != "http://s.gr-assets.com/assets/nophoto/book/111x148-c93ac9cca649f584bf7c2539d88327a8.png"){
          //     books.push(book);
          //   }
          // }
          $scope.search_results = data;
          console.log(data)
        });
    };

    $scope.chooseBook = function(book) {
      $scope.book = {
        id : book.id[0]._,
        title : book.best_book[0].title[0],
        author : book.best_book[0].author[0].name[0],
        thumbnail : book.best_book[0].image_url[0]
      }
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
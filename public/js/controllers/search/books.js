angular.module('books', [])
  .controller('books', function($scope, $routeParams, $location, GoogleBooks, CurrentSoundtrack) {

    GoogleBooks.search($routeParams.search_term)
      .success(function(data) {
        $scope.search_results = data;
      });

    $scope.chooseBook = function(book) {
      $scope.book = {
        id : book.id,
        title : book.title,
        author : book.authors[0],
        thumbnail : book.thumbnail
      }
      $scope.soundtrack = {
        title: 'test',
        description: 'test'
      }
      CurrentSoundtrack.set({book: $scope.book, soundtrack: $scope.soundtrack});
      $location.path('/playlists/new');
      // $scope.book = {
      //   id : book.id[0]._,
      //   title : book.best_book[0].title[0],
      //   author : book.best_book[0].author[0].name[0],
      //   thumbnail : book.best_book[0].image_url[0]
      // }
    };

  });
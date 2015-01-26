angular.module('books', [])
  .controller('books', function($scope, $routeParams, $location, GoogleBooks, CurrentSoundtrack) {

    $scope.search_term = $routeParams.search_term;

    $scope.genres = [
      "Blues",
      "Classical",
      "Country/Folk",
      "Electronic",
      "Indie/Alternative",
      "Jazz",
      "Pop",
      "R&B",
      "Rap",
      "Reggae",
      "Rock",
    ]

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

      // $scope.book = {
      //   id : book.id[0]._,
      //   title : book.best_book[0].title[0],
      //   author : book.best_book[0].author[0].name[0],
      //   thumbnail : book.best_book[0].image_url[0]
      // }
    };

    $scope.newPlaylist = function() {
      if($scope.formData != null){
        $scope.soundtrack = {
          title: $scope.formData.title,
          description: $scope.formData.description,
          genre: $scope.formData.genre
        }
        CurrentSoundtrack.del()
        CurrentSoundtrack.set({book: $scope.book, soundtrack: $scope.soundtrack});
        $location.path('/songs');
      }
    };
  });
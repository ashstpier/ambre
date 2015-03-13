angular.module('oneBook', [])
  .controller('oneBook', function($scope, $routeParams, $location, Book, GoogleBooks, CurrentSoundtrack) {

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
    $scope.sort_genre = 'all';
    $scope.predicate = 'createdAt'

    Book.getOne($routeParams.book_id)
      .success(function(data) {
        $scope.book = data;
        if($scope.book == 'error'){

          GoogleBooks.get($routeParams.book_id)
            .success(function(data) {
              var data = JSON.parse(data)
              $scope.book = {
                id: data.id,
                title: data.volumeInfo.title,
                author: data.volumeInfo.authors[0],
                thumbnail: data.volumeInfo.imageLinks.thumbnail,
                description: data.volumeInfo.description,
                publisher: data.volumeInfo.publisher,
                published_date: new Date(data.volumeInfo.publishedDate),
                page_count: data.volumeInfo.pageCount,
                category: data.volumeInfo.categories[0],
                link: data.volumeInfo.infoLink,
              }
              Book.create($scope.book);
            });

        }
      });

      $scope.newPlaylist = function() {
        if($scope.formData != null){
          $scope.soundtrack = {
            title: $scope.formData.title,
            description: $scope.formData.description,
            genre: $scope.formData.genre
          }
          CurrentSoundtrack.del()
          CurrentSoundtrack.set({id: $scope.book.id, soundtrack: $scope.soundtrack});
          $location.path('/songs/search');
        }
      };

  });
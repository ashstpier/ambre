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

    Book.getOne($routeParams.book_id)
      .success(function(data) {
        $scope.book = data;
        if($scope.book == 'error'){

          GoogleBooks.search($routeParams.book_id)
            .success(function(data) {
              $scope.book = {
                id: data[0].id,
                title: data[0].title,
                author: data[0].authors[0],
                thumbnail: data[0].thumbnail,
              }
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
          CurrentSoundtrack.set({book: $scope.book, soundtrack: $scope.soundtrack});
          $location.path('/songs/search');
        }
      };

  });
angular.module('songs', [])
  .controller('songs', function($scope, $http, $location, Soundtrack, Book, Spotify, CurrentSoundtrack) {
    $scope.playlist = CurrentSoundtrack.get();
    $scope.playlist.soundtrack.tracks = [];

    Book.getOne($scope.playlist.id)
      .success(function(data) {
        $scope.book = data
      });

    Spotify.library()
      .success(function(data) {

        var results = []
        for(item of data.items){
          results.push(item.track)
        }
        $scope.search_results = results;
      });

    $scope.searchTrack = function(term) {
      Spotify.search(term)
        .success(function(data) {
          $scope.search_results = data.tracks.items;
        });
    };

    $scope.addTrack = function(track) {
      if ($scope.playlist.soundtrack.tracks.length <= 19) {
        var track = {
          uri: track.uri,
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          cover: track.album.images[2].url || track.album.images[1].url || track.album.images[0].url
        }
        $scope.playlist.soundtrack.tracks.push(track);
        console.log($scope.playlist.soundtrack.tracks);
      }
    };

    $scope.removeTrack = function(index) {
      $scope.playlist.soundtrack.tracks.splice(index, 1);
    };

    $scope.saveSoundtrack = function() {

      Soundtrack.create($scope.book.id, $scope.playlist.soundtrack)
        .success(function(data) {
          $location.path('/user/playlists');
        });
    };
  });
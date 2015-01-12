angular.module('addSongs', [])
  .controller('addSongs', function($scope, $http, $location, Soundtrack, Spotify, CurrentBook) {
    $scope.tracks = [];
    $scope.book = CurrentBook.get();

    $scope.searchTrack = function(term) {
      Spotify.search(term)
        .success(function(data) {
          $scope.search_results = data.tracks.items;
        });
    };

    $scope.addTrack = function(track) {
      if ($scope.tracks.length <= 19) {
        var track = {
          uri: track.uri,
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name
        }
        $scope.tracks.push(track);
      }
    };

    $scope.saveSoundtrack = function() {

      Soundtrack.create($scope.book, $scope.tracks)
        .success(function(data) {
          CurrentBook.del()
          $location.path('/new/songs');
        });
    };
  });
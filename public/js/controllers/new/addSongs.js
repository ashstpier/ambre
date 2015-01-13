angular.module('addSongs', [])
  .controller('addSongs', function($scope, $http, $location, Soundtrack, Spotify, CurrentSoundtrack) {
    $scope.playlist = CurrentSoundtrack.get();
    $scope.playlist.soundtrack.tracks = [];

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
          album: track.album.name
        }
        $scope.playlist.soundtrack.tracks.push(track);
      }
    };

    $scope.saveSoundtrack = function() {

      Soundtrack.create($scope.playlist.book, $scope.playlist.soundtrack)
        .success(function(data) {
          CurrentSoundtrack.del()
          $location.path('/user/playlists');
        });
    };
  });
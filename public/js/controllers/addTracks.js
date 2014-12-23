angular.module('addTracks', [])
  .controller('addTracks', function($scope, $http, $location, Mixtapes, CurrentMixtape) {
    $scope.tracks = [];
    $scope.mixtape = CurrentMixtape.get();

    $scope.searchTrack = function(term) {
      $http.get('/spotify/search/' + term)
        .success(function(data) {
          $scope.search_results = data.tracks.items;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    $scope.addTrack = function(track) {
      if ($scope.tracks.length <= 19) {
        var track = {
          uri: track.uri,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name
        }
        $scope.tracks.push(track);
        $scope.mixtape.tracks = $scope.tracks;
        CurrentMixtape.set($scope.mixtape);
      }
    };

    $scope.saveMixtape = function() {

      $http.post('/spotify/addsongs', CurrentMixtape.get())
        .success(function(data) {});

      Mixtapes.create($scope.mixtape)
        .success(function(data) {
          $location.path('/user/mixtapes')
          CurrentMixtape.del();
        });
    };
  });
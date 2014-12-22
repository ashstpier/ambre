angular.module('mixtapeController', [])
  .controller('mixtapeController', function($scope, $http, $location, Mixtapes) {
    $scope.mixtape = {};
    $scope.formData = {};
    $scope.tracks = [];

    Mixtapes.get()
      .success(function(data) {
        $scope.mixtapes = data;
      });

    $scope.createMixtape = function() {
      if (!$.isEmptyObject($scope.formData)) {

        $scope.mixtape = {
          title: $scope.formData.title,
          description: $scope.formData.description,
          tracks: $scope.tracks
        };

        $http.post('/spotify/createplaylist', $scope.mixtape)
          .success(function(data) {

            $scope.mixtape.playlist_id = data.id;

            Mixtapes.create($scope.mixtape)
              .success(function(data) {
                $scope.formData = {};
                $scope.tracks = [];
                $scope.mixtape = {};
                $scope.mixtapes = data;
              });

            $http.post('/spotify/addsongs', $scope.mixtape)
              .success(function(data) {});

          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      }
    };

    $scope.deleteMixtape = function(id) {
      Mixtapes.delete(id)
        .success(function(data) {
          $scope.mixtapes = data;
        });
    };

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
      }
    };
  });
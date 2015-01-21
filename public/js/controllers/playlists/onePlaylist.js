angular.module('onePlaylist', [])
  .controller('onePlaylist', function($scope, $routeParams, $sce, Soundtrack) {

    Soundtrack.getOne($routeParams.playlist_id)
      .success(function(data) {
        var track_ids = [];
        for(track of data.tracks){
          track_ids.push(track.id)
        }
        $scope.playlist = data;
        $scope.playlist_url = $sce.trustAsResourceUrl('https://embed.spotify.com/?uri=spotify:trackset:title:' + track_ids.toString());
      });

  });
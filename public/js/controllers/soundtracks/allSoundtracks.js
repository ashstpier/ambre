angular.module('allSoundtracks', [])
  .controller('allSoundtracks', function($scope, Soundtrack) {

    $scope.predicate = "createdAt";
    $scope.reverse = true;

    Soundtrack.get()
      .success(function(data) {
        $scope.soundtracks = data;
      });

  });
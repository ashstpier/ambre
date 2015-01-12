angular.module('userSoundtracks', [])
  .controller('userSoundtracks', function($scope, User) {

    User.get()
      .success(function(data) {
        $scope.soundtracks = data;
      });

  });
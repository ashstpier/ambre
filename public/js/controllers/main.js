angular.module('main', [])
  .controller('main', function($scope, $http, $location, Spotify, User) {

    $scope.navopen = false;

    User.get()
      .success(function(data) {
        $scope.playlist_count = data.count;
      });

    $scope.downloadPlaylist = function(soundtrack) {
      Spotify.download(soundtrack)
        .success(function(data) {
          window.open('https://open.spotify.com/user/' + data.owner.id + '/playlist/' + data.id);
        });
    };

    $scope.isActive = function(path) {
      if ($location.path().substr(0, path.length) == path) {
        return "active"
      } else {
        return ""
      }
    }

    $scope.searchBook = function() {
      if ($scope.search) {
        $location.path('/books/search/' + $scope.search);
      }
    };

    $scope.toggleNav = function() {
      if($scope.navopen == false){
        angular.element('#offcanvas, .navbar, #page').addClass('nav-open');
        $scope.navopen = true;
      }else{
        angular.element('#offcanvas, .navbar, #page').removeClass('nav-open');
        $scope.navopen = false;
      }
    };

    $scope.closeNav = function() {
      angular.element('#offcanvas, .navbar, #page').removeClass('nav-open');
      $scope.navopen = false;
    };

  });
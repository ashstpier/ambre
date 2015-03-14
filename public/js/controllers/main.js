angular.module('main', [])
  .controller('main', function($scope, $http, $sce, $location, Spotify, User) {

    $scope.navopen = false;
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
    $scope.sort_genre = 'all';

    User.get()
      .success(function(data) {
        $scope.user = data;
        $scope.playlist_count = data.soundtracks.length;
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

    $scope.renderHtml = function(html_code, max){
      var html = html_code || '';
      return $sce.trustAsHtml(html.substr(0, max).trim() + '…')
    };

  });
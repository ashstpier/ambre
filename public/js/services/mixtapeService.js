angular.module('mixtapeService', [])

  .factory('Mixtapes', function($http) {
    return {
      get : function() {
          return $http.get('/api/mixtapes');
      },
      create : function(mixtapeData) {
          return $http.post('/api/mixtapes', mixtapeData);
      },
      delete : function(id) {
          return $http.delete('/api/mixtapes/' + id);
      }
    }
  });

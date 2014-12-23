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
  })
  .factory('User', function($http) {
    return {
      get : function() {
        return $http.get('/api/user/mixtapes');
      }
    }
  })
  .factory('CurrentMixtape', function($cookieStore) {
    return {
      set : function(data) {
        return $cookieStore.put('currentMixtape', data);
      },
      get : function() {
        return $cookieStore.get('currentMixtape');
      },
      del : function() {
        return $cookieStore.remove('currentMixtape');
      }
    }
  });

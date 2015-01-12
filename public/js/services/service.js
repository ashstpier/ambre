angular.module('services', [])

  .factory('Soundtrack', function($http) {
    return {
      get : function() {
          return $http.get('/api/soundtracks');
      },
      create : function(book, tracks) {
          return $http.post('/api/soundtracks', {book: book, tracks: tracks});
      },
      delete : function(id) {
          return $http.delete('/api/soundtracks/' + id);
      }
    }
  })
  .factory('Book', function($http) {
    return {
      get : function() {
          return $http.get('/api/books');
      },
      create : function(bookData) {
          return $http.post('/api/books', bookData);
      }
    }
  })
  .factory('User', function($http) {
    return {
      get : function() {
        return $http.get('/api/user/soundtracks');
      }
    }
  })
  .factory('CurrentBook', function($cookieStore) {
    return {
      set : function(data) {
        return $cookieStore.put('CurrentBook', data);
      },
      get : function() {
        return $cookieStore.get('CurrentBook');
      },
      del : function() {
        return $cookieStore.remove('CurrentBook');
      }
    }
  })
  .factory('Spotify', function($http) {
    return {
      search : function(term) {
        return $http.get('/spotify/search/' + term);
      },
      download : function(soundtrack) {
        return $http.post('/spotify/createplaylist', soundtrack);
      }
    }
  })
  .factory('GoogleBooks', function($http) {
    return {
      search : function(term) {
        return $http.get('/books/' + term);
      }
    }
  });

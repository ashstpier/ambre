angular.module('services', [])

  .factory('Soundtrack', function($http) {
    return {
      getAll : function() {
          return $http.get('/api/soundtracks');
      },
      getOne : function(id) {
          return $http.get('/api/soundtracks/' + id);
      },
      create : function(book, soundtrack) {
          return $http.post('/api/soundtracks', {book: book, soundtrack: soundtrack});
      },
      delete : function(id) {
          return $http.delete('/api/soundtracks/' + id);
      }
    }
  })
  .factory('Book', function($http) {
    return {
      getAll : function() {
          return $http.get('/api/books');
      },
      getOne : function(id) {
          return $http.get('/api/books/' + id);
      },
      create : function(bookData) {
          return $http.post('/api/books', bookData);
      }
    }
  })
  .factory('UserPlaylist', function($http) {
    return {
      get : function() {
        return $http.get('/api/user/soundtracks');
      },
      getOne : function(id) {
        return $http.get('/api/users/' + id);
      }
    }
  })
  .factory('User', function($http) {
    return {
      get : function() {
        return $http.get('/api/user');
      }
    }
  })
  .factory('CurrentSoundtrack', function($cookieStore) {
    return {
      set : function(data) {
        return $cookieStore.put('CurrentSoundtrack', data);
      },
      get : function() {
        return $cookieStore.get('CurrentSoundtrack');
      },
      del : function() {
        return $cookieStore.remove('CurrentSoundtrack');
      }
    }
  })
  .factory('Spotify', function($http) {
    return {
      search : function(term) {
        return $http.get('/spotify/search/' + term);
      },
      library : function() {
        return $http.get('/spotify/library');
      },
      download : function(soundtrack) {
        return $http.post('/spotify/createplaylist', soundtrack);
      }
    }
  })
  .factory('GoogleBooks', function($http) {
    return {
      search : function(term) {
        return $http.get('/books/' + term, {cache: true});
      },
      get : function(id) {
        return $http.get('/books/volume/' + id);
      }
    }
  });

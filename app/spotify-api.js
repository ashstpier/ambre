var _ = require('underscore');

module.exports = function(app, spotifyApi){

  app.get('/spotify/profile', function(req, res) {
    spotifyApi.getMe()
      .then(function(data) {
        console.log('Some information about the authenticated user', data);
        res.json(data);
      }, function(err) {
        console.log('Something went wrong!', err);
      });
  });

  app.get('/spotify/playlists', function(req, res) {
    spotifyApi.getUserPlaylists(req.user.username)
      .then(function(data) {
        console.log('Retrieved playlists', data);
        res.json(data);
      },function(err) {
        console.log('Something went wrong!', err);
      });
  });

  app.post('/spotify/createplaylist', function(req, res) {
    spotifyApi.createPlaylist(req.user.username, req.body.title, { 'public' : true })
      .then(function(data) {
        var tracks = _.map(req.body.tracks, function(track){ return track.uri; });

        spotifyApi.replaceTracksInPlaylist(req.user.username, data.id, tracks)
          .then(function(data) {
            console.log('Downloaded playlist!');
          }, function(err) {
            console.log('Something went wrong!', err);
        });
        res.json(data);
      }, function(err) {
        console.log('Something went wrong!', err);
      });
  });

  app.get('/spotify/search/:search_term', function(req, res) {
    spotifyApi.searchTracks(req.params.search_term)
      .then(function(data) {
        res.json(data);
      }, function(err) {
        console.error(err);
      });
  });

  app.get('/spotify/library', function(req, res) {
    spotifyApi.getMySavedTracks({
      limit : 20
    })
    .then(function(data) {
      console.log(data)
      res.json(data);
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  });
}
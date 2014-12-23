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
        console.log('Created playlist!');
        res.json(data);
      }, function(err) {
        console.log('Something went wrong!', err);
      });
  });

  app.post('/spotify/addsongs', function(req, res) {

    var tracks = _.map(req.body.tracks, function(track){ return track.uri; });

    spotifyApi.replaceTracksInPlaylist(req.user.username, req.body.playlist_id, tracks)
      .then(function(data) {
        console.log('Added tracks to playlist!');
      }, function(err) {
        console.log('Something went wrong!', err);
    });
  });

  app.get('/spotify/search/:search_term', function(req, res) {
    spotifyApi.searchTracks(req.params.search_term)
      .then(function(data) {
        console.log('Search by ' + req.params.search_term, data);
        res.json(data);
      }, function(err) {
        console.error(err);
      });
  });
}
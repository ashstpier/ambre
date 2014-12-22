var Mixtape = require('./models/mixtape');

module.exports = function(app){

  app.get('/api/mixtapes', function(req, res) {
    Mixtape.find(function(err, mixtapes) {
      if (err)
        res.send(err)
      res.json(mixtapes);
    });
  });

  app.post('/api/mixtapes', function(req, res) {
    Mixtape.create({
      title : req.body.title,
      description : req.body.description,
      tracks : req.body.tracks,
      track_uris : req.body.track_uris,
      playlist_id : req.body.playlist_id
    }, function(err, mixtape) {
      if (err)
        res.send(err);

      Mixtape.find(function(err, mixtapes) {
        if (err)
          res.send(err)
        res.json(mixtapes);
      });
    });
  });

  app.delete('/api/mixtapes/:mixtape_id', function(req, res) {
    Mixtape.remove({
      _id : req.params.mixtape_id
    }, function(err, mixtape) {
      if (err)
        res.send(err);

      Mixtape.find(function(err, mixtapes) {
        if (err)
          res.send(err)
        res.json(mixtapes);
      });
    });
  });
}
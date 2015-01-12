module.exports = function(app, Soundtrack, Book){

  app.get('/api/soundtracks', function(req, res) {
    Soundtrack.findAll({include: [ Book ]})
      .complete(function(err, soundtracks) {
        if (!!err) {
          console.log('An error occurred:', err)
        } else if (!soundtracks) {
          console.log('No soundtracks have been found.')
        } else {
          console.log('Found soundtracks.')
          res.json(soundtracks);
        }
      });
  });

  app.post('/api/soundtracks', function(req, res) {
    var book = req.body.book;
    var tracks = req.body.tracks;

    Book.findOrCreate({
      where: { id: book.id },
      defaults: {
        title : book.title,
        authors : book.authors,
        publisher : book.publisher,
        thumbnail : book.thumbnail
      }
    })
    .spread(function(book, created) {
      Soundtrack.create({
          author : req.user.username,
          tracks : tracks
        })
        .complete(function(err, soundtrack) {
          book.addSoundtrack(soundtrack).complete(function(err) {});
          res.json(soundtrack);
        });
    })
  });

  app.delete('/api/soundtracks/:soundtrack_id', function(req, res) {
    Soundtrack.remove({
      _id : req.params.soundtrack_id
    }, function(err, soundtracks) {
      if (err)
        res.send(err);

      Soundtrack.find(function(err, soundtracks) {
        if (err)
          res.send(err)
        res.json(soundtracks);
      });
    });
  });

  app.get('/api/user/soundtracks', function(req, res) {
    Soundtrack.findAll({ where: { author: req.user.username }, include: [ Book ] })
      .complete(function(err, soundtracks) {
        if (!!err) {
          console.log('An error occurred:', err)
        } else if (!soundtracks) {
          console.log('No soundtracks have been found.')
        } else {
          res.json(soundtracks);
        }
      });
  });
}
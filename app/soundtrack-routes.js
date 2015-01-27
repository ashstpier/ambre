module.exports = function(app, Soundtrack, Book){

  app.get('/api/soundtracks', function(req, res) {
    Soundtrack.findAll({
        include: [ Book ],
        limit: 8,
        order: '"createdAt" DESC'
      })
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

  app.get('/api/soundtracks/:soundtrack_id', function(req, res) {
    Soundtrack.find({ where: { id: req.params.soundtrack_id }, include: [ Book ]})
      .complete(function(err, soundtrack) {
        if (!!err) {
          console.log('An error occurred:', err)
        } else if (!soundtrack) {
          console.log('No soundtracks have been found.')
        } else {
          console.log('Found soundtracks.')
          res.json(soundtrack);
        }
      });
  });

  app.post('/api/soundtracks', function(req, res) {
    var book = req.body.book;
    var soundtrack = req.body.soundtrack;

    Book.findOrCreate({
      where: { id: book.id },
      defaults: {
        title : book.title,
        author : book.author,
        publisher : book.publisher,
        thumbnail : book.thumbnail
      }
    })
    .spread(function(book, created) {
      Soundtrack.create({
          title: soundtrack.title,
          description: soundtrack.description,
          genre: soundtrack.genre,
          author : req.user.username,
          tracks : soundtrack.tracks
        })
        .complete(function(err, soundtrack) {
          book.addSoundtrack(soundtrack).complete(function(err) {});
          res.json(soundtrack);
        });
    })
  });

  app.delete('/api/soundtracks/:soundtrack_id', function(req, res) {
    Soundtrack.find({ where: { id: req.params.soundtrack_id } })
      .complete(function(err, soundtrack) {
        if (!!err) {
          console.log('An error occurred:', err)
        } else if (!soundtrack) {
          console.log('No soundtracks have been found.')
        } else {
          soundtrack.destroy().then(function() {
            console.log('soundtrack deleted!')
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
          })
        }
      });
  });

  app.get('/api/user/soundtracks', function(req, res) {
    Soundtrack.findAndCountAll({ where: { author: req.user.username }, include: [ Book ] })
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
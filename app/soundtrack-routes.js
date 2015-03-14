module.exports = function(app, Soundtrack, Book, User){

  app.get('/api/soundtracks', function(req, res) {
    Soundtrack.findAll({
        include: [ Book ],
        limit: 20,
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
    Soundtrack.find({ where: { id: req.params.soundtrack_id }, include: [ Book, User ]})
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

    Book.find(book)
    .then(function(book) {
      User.find({ where: {id: req.user.username} })
        .then(function(user) {
          Soundtrack.create({
              title: soundtrack.title,
              description: soundtrack.description,
              genre: soundtrack.genre,
              tracks: soundtrack.tracks
            })
            .complete(function(err, soundtrack) {
              book.addSoundtrack(soundtrack).complete(function(err) {});
              user.addSoundtrack(soundtrack).complete(function(err) {});
              res.json(soundtrack);
            });
        });
    });
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

  app.get('/api/users/:user_id', function(req, res) {
    Soundtrack.findAll({ where: { userId: req.params.user_id }, include: [ Book ] })
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

  app.get('/api/user/soundtracks', function(req, res) {
    Soundtrack.findAll({ where: { userId: req.user.id }, include: [ Book ] })
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
  app.get('/api/user', function(req, res) {
    User.find({ where: { id: req.user.id }, include: [ Soundtrack ] })
      .complete(function(err, user) {
        if (!!err) {
          console.log('An error occurred:', err)
        } else if (!user) {
          console.log('No soundtracks have been found.')
        } else {
          res.json(user);
        }
      });
  });
}
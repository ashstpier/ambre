module.exports = function(app, Book){

  app.get('/api/books', function(req, res) {
    Book.findAll()
      .complete(function(err, books) {
        if (!!err) {
          console.log('An error occurred:', err)
        } else if (!books) {
          console.log('No books have been found.')
        } else {
          console.log('Found books.')
          res.json(books);
        }
      });
  });

  app.post('/api/books', function(req, res) {
    Book.create({
        id : req.body.id,
        title : req.body.title,
        author : req.body.author,
        thumbnail : req.body.thumbnail
      })
      .complete(function(err, books) {
        Book.findAll()
          .complete(function(err, books) {
            if (!!err) {
              console.log('An error occurred:', err)
            } else if (!books) {
              console.log('No books have been found.')
            } else {
              res.json(books);
            }
          })
      });
  });
}
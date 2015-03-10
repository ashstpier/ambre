module.exports = function(app, Book, Soundtrack){

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

  app.get('/api/books/:book_id', function(req, res) {
    Book.find({ where: { id: req.params.book_id }, include: [ Soundtrack ]})
      .complete(function(err, book) {
        if (!!err) {
          console.log('An error occurred:', err)
        } else if (!book) {
          res.send('error');
        } else {
          console.log('Found book.')
          res.json(book);
        }
      });
  });

  app.post('/api/books', function(req, res) {
    Book.create({
        id : req.body.id,
        title : req.body.title,
        author : req.body.author,
        thumbnail : req.body.thumbnail,
        description: req.body.description,
        publisher: req.body.publisher,
        published_date: req.body.published_date,
        page_count: req.body.page_count,
        category: req.body.category,
        link: req.body.link,
        price: req.body.price
      });
  });
}
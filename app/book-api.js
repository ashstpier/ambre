var request = require('request');

var books = require('google-books-search');
var options = {
  key: "AIzaSyAd2RiqwcmJv7lkU-QgTsh-0gVXqnOC7vc",
  offset: 0,
  limit: 20,
  type: 'books',
  order: 'relevance',
  lang: 'en'
};

goodreads = require('goodreads');
gr = new goodreads.client({ 'key': 'WHw2vF1QeKx5EfoOx8Lw', 'secret': 'jkGBYlbDnjurjMpntZwNtsYJ1KSZ3NbvCHTQyfWpF8M' });

module.exports = function(app){

  app.get('/books/:search_term', function(req, res) {
    // gr.search(req.params.search_term, 1, function(json) {
    //   if (json) {
    //     res.json(json.GoodreadsResponse.search[0].results[0].work);
    //   }
    // });

    books.search(req.params.search_term, options, function(error, data) {
      if ( !error ) {
        res.json(data);
      } else {
        console.log(error);
      }
    });
  });

  app.get('/books/volume/:id', function(req, res) {
    request('https://www.googleapis.com/books/v1/volumes/' + req.params.id + '?key=' + options.key, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.json(body);
      }
    })
  });
}
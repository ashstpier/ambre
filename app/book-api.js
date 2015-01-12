var books = require('google-books-search');
var options = {
  key: "AIzaSyAd2RiqwcmJv7lkU-QgTsh-0gVXqnOC7vc",
  offset: 0,
  limit: 10,
  type: 'books',
  order: 'relevance',
  lang: 'en'
};

module.exports = function(app){

  app.get('/books/:search_term', function(req, res) {
    books.search(req.params.search_term, options, function(error, data) {
      if ( !error ) {
        res.json(data);
      } else {
        console.log(error);
      }
    });
  });
}
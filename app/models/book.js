module.exports = function(database){
  var Book = database.sequelize.define('book', {
    id: {
      type: database.dataType.STRING,
      primaryKey: true
    },
    title : database.dataType.STRING,
    thumbnail : database.dataType.TEXT,
    author: database.dataType.STRING,
    description: database.dataType.TEXT,
    publisher: database.dataType.STRING,
    published_date: database.dataType.DATE,
    page_count: database.dataType.INTEGER,
    category: database.dataType.STRING,
    link: database.dataType.STRING
  })

  return Book;
}
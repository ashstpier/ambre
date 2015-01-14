module.exports = function(database){
  var Book = database.sequelize.define('book', {
    id: {
      type: database.dataType.STRING,
      primaryKey: true
    },
    title : database.dataType.STRING,
    thumbnail : database.dataType.STRING,
    author: database.dataType.STRING
  })

  return Book;
}
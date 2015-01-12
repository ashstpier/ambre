module.exports = function(database){
  var Book = database.sequelize.define('book', {
    id: {
      type: database.dataType.STRING,
      primaryKey: true
    },
    title : database.dataType.STRING,
    publisher : database.dataType.STRING,
    thumbnail : database.dataType.STRING,
    authors: {
      type: database.dataType.TEXT,
      get: function() {
        return JSON.parse(this.getDataValue('authors'))
      },
      set: function(value) {
        return this.setDataValue('authors', JSON.stringify(value))
      }
    }
  })

  return Book;
}
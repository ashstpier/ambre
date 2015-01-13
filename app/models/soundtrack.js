module.exports = function(database){
  var Soundtrack = database.sequelize.define('soundtrack', {
    title : database.dataType.STRING,
    description : database.dataType.STRING,
    author : database.dataType.STRING,
    tracks: {
      type: database.dataType.TEXT,
      get: function() {
        return JSON.parse(this.getDataValue('tracks'))
      },
      set: function(value) {
        return this.setDataValue('tracks', JSON.stringify(value))
      }
    }
  })

  return Soundtrack;
}
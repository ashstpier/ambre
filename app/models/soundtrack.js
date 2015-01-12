module.exports = function(database){
  var Soundtrack = database.sequelize.define('soundtrack', {
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
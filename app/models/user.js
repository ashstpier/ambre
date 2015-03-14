module.exports = function(database){
  var User = database.sequelize.define('user', {
    id: {
      type: database.dataType.STRING,
      primaryKey: true
    },
    name: database.dataType.STRING
  })

  return User;
}
var Sequelize = require('sequelize');
var sequelize = new Sequelize('ambre', 'ashstpier', null, {
  dialect: 'postgres',
  port:    5432,
})

sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  })

module.exports = {
  sequelize : sequelize,
  dataType : Sequelize
};
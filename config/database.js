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

sequelize
  .sync()
  .complete(function(err) {
     if (!!err) {
       console.log('An error occurred while creating the table:', err)
     } else {
       console.log('It worked!')
     }
  })

module.exports = {
  sequelize : sequelize,
  dataType : Sequelize
};
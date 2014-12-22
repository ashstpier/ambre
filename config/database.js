var uriUtil = require('mongodb-uri');

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

var mongodbUri = 'mongodb://admin:password@ds027521.mongolab.com:27521/ambre';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

module.exports = {
  url : mongooseUri,
  options : options
};
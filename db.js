var Sequelize = require("sequelize")
	, sequelize = new Sequelize('snapvote', 'root', 'p314159265I!', { //QDuQuxGBcr5JabP5', {
		dialect : "mysql",
		port : 3306
	});
	
sequelize
	.authenticate()
	.complete(function(err) {
		if (!!err) {
			console.log('Unable to connect to the database:', err)
		} else {
			console.log('Connection has been established successfully.')
		}
	});

exports.Vote = sequelize.import(__dirname + '/model/vote');
exports.Answer = sequelize.import(__dirname + '/model/answer');
exports.Cast = sequelize.import(__dirname + '/model/cast');

exports.Vote.hasMany(exports.Answer);
exports.Answer.belongsTo(exports.Vote);

exports.Answer.hasMany(exports.Cast);
exports.Cast.belongsTo(exports.Answer);

sequelize
	.sync()
	.complete(function(err) {
		if ( !!err ) {
			console.log('Error syncing:', err);
		}
	});

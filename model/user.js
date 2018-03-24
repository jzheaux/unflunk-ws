// user.js

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
			username : DataTypes.STRING,
			password : DataTypes.STRING,
			rating : DataTypes.INTEGER
		},
		{ tableName : 'user' }
	);
	
	return User;
};

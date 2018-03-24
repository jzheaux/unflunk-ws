// session-user.js

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('SessionUser', {
		},
		{ tableName : 'session_user' }
	);
};
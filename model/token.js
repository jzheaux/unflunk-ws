// token.js

module.exports = function(sequelize, DataTypes) {
	var Token = sequelize.define('Token', {
			token : DataTypes.STRING,
			last_used : DataTypes.DATE,
			must_reapply_by : DataTypes.DATE
		},
		{ tableName : 'token' }
	);
	
	return Token;
};

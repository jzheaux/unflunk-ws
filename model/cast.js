// cast.js

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Cast', {
			hash : DataTypes.STRING
		},
		{ tableName : 'cast' }
	);
};


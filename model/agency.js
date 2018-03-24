// agency.js

module.exports = function(sequelize, DataTypes) {
	var Agency = sequelize.define('Agency', {
			name : DataTypes.STRING,
			type : DataTypes.STRING
		},
		{ tableName : 'agency' }
	);
	
	return Agency;
};
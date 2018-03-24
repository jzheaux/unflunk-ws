// subscription.js

module.exports = function(sequelize, DataTypes) {
	var Subscription = sequelize.define('Subscription', {
			cost : DataTypes.FLOAT,
			duration : DataTypes.INTEGER,
			duration_unit : DataTypes.STRING,
			audience : DataTypes.STRING
		},
		{ tableName : 'subcription' }
	);
	
	return Subscription;
};
// subscription-usage-grant.js

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('SubscriptionUsageGrant', {
			numberOfUses : { type : DataTypes.INTEGER, name : 'number_of_uses' },
			using : DataTypes.ENUM('SESSION', 'MINUTE'),
			renewalFrequency : { type : DataTypes.INTEGER, name : 'renewal_frequency' },
			renewalFrequencyUnit : { type : DataTypes.ENUM, values : ['MONTH', 'YEAR'], name : 'renewal_frequency_unit' },
			supportsRollover : { type : DataTypes.BOOLEAN, name : 'supports_rollover' }
		},
		{ tableName : 'subcription_usage_grant' }
	);
};
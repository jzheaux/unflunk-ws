// user-subscription.js

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('UserSubscription', {
			effectiveDate : { type : DataTypes.DATE, columnName : 'effective_date' },
			nextRenewalDate : { type : DataTypes.DATE, columnName : 'next_renewal_date' },
			autoRenew : { type : DataTypes.DATE, columnName : 'auto_renew' },
			status : DataTypes.ENUM('ACTIVE', 'INACTIVE'),
			usesLeft : { type : DataTypes.INTEGER, columnName : 'uses_left' }
		},
		{ tableName : 'user_subscription' }
	);
};
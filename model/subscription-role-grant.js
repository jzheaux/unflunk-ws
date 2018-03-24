// subscription-role-grant.js

module.exports = function(sequelize, DataTypes) {
	var SubscriptionRoleGrant = sequelize.define('SubscriptionRoleGrant', {
			
		},
		{ tableName : 'subcription_role_grant' }
	);
	
	return SubscriptionRoleGrant;
};
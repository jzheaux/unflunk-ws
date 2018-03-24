// event-user-invitation.js

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('EventUserInvitation', {
			response : DataTypes.ENUM('ACCEPT', 'MAYBE', 'DECLINE'),
			attended : DataTypes.BOOLEAN
		},
		{ tableName : 'event_user_invitation' }
	);
};
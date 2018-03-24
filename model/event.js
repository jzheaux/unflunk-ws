// event.js

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Event', {
			title : DataTypes.STRING,
			when : DataTypes.DATE,
			location : DataTypes.STRING,
			startTime : { type : DataTypes.DATE, columnName : 'start_time' },
			endTime : { type : DataTypes.DATE, columnName : 'end_time' },
			inviteesOnly : { type : DataTypes.BOOLEAN, columnName : 'invitees_only' }
		},
		{ tableName : 'event' }
	);
};
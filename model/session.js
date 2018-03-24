// session.js

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Session', {
			length : DataTypes.INTEGER,
			lengthUnit : { type : DataTypes.ENUM, values : [ 'MINUTE', 'HOUR' ], columnName : 'length_unit' },
			startTime : { type : DataTypes.DATE, columnName : 'start_time' },
			endTime : { type : DataTypes.DATE, columnName : 'end_time' }
		},
		{ tableName : 'session' }
	);
};
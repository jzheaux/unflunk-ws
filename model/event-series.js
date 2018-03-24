// event-series.js

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('EventSeries', {
			recurrence : DataTypes.STRING,
			startDate : { type : DataTypes.DATE, columnName : 'start_date' },
			endDate : { type : DataTypes.DATE, columnName : 'end_date' },
			eventTitle : { type : DataTypes.STRING, columnName : 'event_title' },
			eventLocation : { type : DataTypes.STRING, columnName : 'event_location' },
			eventStartTime : { type : DataTypes.DATE, columnName : 'event_start_time' },
			eventEndTime : { type : DataTypes.DATE, columnName : 'event_end_time' }
		},
		{ tableName : 'event_series' }
	);
};
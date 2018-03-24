// vote.js

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Vote', {
			question : DataTypes.STRING,
			randomizeAnswerOrder : { type : DataTypes.BOOLEAN, columnName : 'randomize_answer_order' },
			startTime : { type : DataTypes.DATE, columnName : 'start_time' },
			endTime : { type : DataTypes.DATE, columnName : 'end_time' },
			minimumVotes : DataTypes.INTEGER,
			maximumVotes : DataTypes.INTEGER,
			participantCode : { type : DataTypes.STRING, columnName : 'participant_code' },
			whenAreResultsPublic : { type : DataTypes.ENUM('NEVER', 'BEFORE', 'AFTER'), columnName : 'when_are_results_public' },
			hash : DataTypes.STRING
		},
		{ tableName : 'vote' }
	);
}

// answer.js

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Answer', {
			text : DataTypes.STRING
		},
		{ tableName : 'answer' }
	);
};

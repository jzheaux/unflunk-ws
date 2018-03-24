// content.js

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Content', {
			mimeType : { type : DataTypes.STRING, columnName : 'mime_type' },
			location : DataTypes.STRING,
			metadata : DataTypes.STRING
		},
		{ tableName : 'content' }
	);
};
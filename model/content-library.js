// content-library.js

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ContentLibrary', {
			title : DataTypes.STRING,
		},
		{ tableName : 'content_library' }
	);
};
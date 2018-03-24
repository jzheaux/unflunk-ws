// user.js

module.exports = function(sequelize, DataTypes) {
	var Role = sequelize.define('Role', {
		name : DataTypes.STRING,
		question_perms : DataTypes.STRING,
		answer_perms : DataTypes.STRING,
		content_perms : DataTypes.STRING,
		session_perms : DataTypes.STRING,
		group_perms : DataTypes.STRING
	},
	{ tableName : 'role' });
	
	Role.find({ where : { name : 'STUDENT' }})
		.complete(function(err, studentRole) {
			if (!!err) {
				console.log('An error occurred while searching for roles:', err)
			} else if (!studentRole) {
				Role.create({ name : 'STUDENT', question_perms : 'GET,PUT,POST', answer_perms : 'GET', content_perms : 'GET', session_perms : 'GET', group_perms : 'GET' })
					.complete(function(err, role) {
						if (!!err) {
							console.log('An error occurred while adding STUDENT role:', err);
						} else {
							Role.STUDENT = role;
						}
					});
			} else {
				Role.STUDENT = studentRole;
			}
	});
	
	return Role;
}
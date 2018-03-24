var crypto = require("crypto");
var db = require(__dirname + '/../db');
var User = db.User;
var Role = db.Role;
var Token = db.Token;

function generateToken(data) {
    var random = Math.floor(Math.random() * 100001);
    var timestamp = (new Date()).getTime();
    var sha256 = crypto.createHmac("sha256", random + "WOO" + timestamp);

    return sha256.update(data).digest("base64");
}

var _exports = {};

_exports.validateClient = function (credentials, req, cb) {
    // Call back with `true` to signal that the client is valid, and `false` otherwise.
    // Call back with an error if you encounter an internal server error situation while trying to validate.
	
    var isValid = true; // for now
    return cb(null, isValid);
};

_exports.grantUserToken = function (credentials, req, cb) {
	return User.find({ where : { username : credentials.username }})
		.complete(function (error, user) {
			if ( !!error ) return cb(error, false);
			
			var parts = user.password.split(":");
			var salt = parts[1];
			var hash = parts[2];
			return crypto.pbkdf2(credentials.password, salt, 10000, 512, function(err, derivedKey) {
				if ( !!error ) return cb(err, false);
				
				if ( derivedKey.toString('base64').substring(0, hash.length) == hash ) {
					// success!
					var token  = generateToken(credentials.username + ":" + hash);
					
					var now = new Date();
					var nowPlus8Hours = new Date(now.getTime() + 8 * 60 * 60 * 1000);
					var newToken = { user_id : user.id, token : token, last_used : now, must_reapply_by : nowPlus8Hours };

					// write to db
					return Token.create(newToken)
						.complete(function (err, token) {
							if ( !!err ) return cb(err, false);
							
							return cb(null, token.token);
						});
				} else {
					return cb(null, false);
				}
			});
		});
}

_exports.authenticateToken = function (token, req, cb) {
	console.log("Token to auth: " + token);
	Token.find({ where : { token : token }})
		.complete(function (error, token) {
			var now = new Date();
			console.log("Last Used: " + token.last_used);
			var lastUsedPlusThirtyMinutes = new Date(token.last_used.getTime() + 30 * 60  * 1000);
			if ( now > lastUsedPlusThirtyMinutes ) {
				// token is expired
				Token.delete(token.id);
				return cb(null, false);
			} else if ( now > token.must_reapply_by ) {
				Token.delete(token.id);
				return cb(null, false);
			}
			token.last_used = now;
			Token.update(token);
			req.username = token.user_id;
			return cb(null, true);
		});
}


module.exports = function(server) {
	server.get('/user/:id', function (req, res, user) {
		var params = JSON.parse(req.body);
		User.find({ where : { id : params.id }})
			.complete(function(error, user) {
				if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
		 
				if (user) {
					res.send(user.values)
				} else {
					res.send(404)
				}
			});
	});

	server.post('/user', function (req, res, next) {
		var params = JSON.parse(req.body);
		
		if ( params.username === undefined ) {
			return next(new restify.InvalidArgumentError('Username must be supplied'));
		}
		if ( params.password === undefined ) {
			return next(new restify.InvalidArgumentError('Password must be supplied'));
		}

		var newUser = { username : params.username, rating : 0 };
		
		var salt = crypto.randomBytes(128).toString('base64');
		crypto.pbkdf2(params.password, salt, 10000, 512, function(err, derivedKey) {
			if (!!err) {
				return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
			}
			
			newUser.password = 10000 + ":" + salt + ":" + derivedKey.toString('base64');
			User.create(newUser)
				.complete(function(err, user) {
					if (!!err) {
						return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
					}
					
					user.addRole(Role.STUDENT)
						.complete(function (err) {
							if (!!err) {
								return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
							}

							res.send(201, user.values);
						});
				});
		});
	});
	
	return _exports;
}


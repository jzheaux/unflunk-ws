// app.js
// Entry-point for unflunk REST api
var restify = require("restify");
var restifyOAuth2 = require("restify-oauth2");

var server  = restify.createServer({ name : 'unflunk',
	formatters: {
		"application/hal+json": function (req, res, body) {
			return res.formatters["application/json"](req, res, body);
		}
	}
});

server
		.use(restify.authorizationParser())
		.use(restify.fullResponse(	))
		.use(restify.bodyParser({ mapParams : false }));

server.get("/", function (req, res) {
	var response = {
		message : "success!"
	}
	
	res.contentType = "application/hal+json";
	res.send(response);
});


var userService = require(__dirname + '/service/userService')(server);
restifyOAuth2.ropc(server, { tokenEndpoint : "/token", hooks : userService });

server.listen(3000, function() {
	console.log('%s listening at %s', server.name, server.url);
})

var logfmt = require("logfmt");	

requirejs.config({
    "baseUrl": "client",
    "paths": {
      "app" : "app",
      "jquery" : "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery",
	  "sammy" : "//cdnjs.cloudflare.com/ajax/libs/sammy.js/0.7.6/sammy",
	  "mustache" : "//cdnjs.cloudflare.com/ajax/libs/mustache.js/2.1.3/mustache.min",
      "sammy-mustache" : "sammy.mustache"
    },
	shim : {
		"sammy" : {
			deps : [ "jquery", "mustache" ],
			exports : "sammy"
		},
		"sammy-mustache" : {
			deps : [ "sammy" ],
			exports : "sammy-mustache"
		}
	}
});

// Load the main app module to start the app
require(["main"]);

require(["jquery", "mustache", "sammy", "sammy-mustache"], function($, Mustache, Sammy, SM) {
  var app = Sammy('#main', function() {
    // include a plugin
    this.use('Mustache');

    // define a 'route'
    this.get('#/vote/:vote', function() {
      // load some data
	this.load('/vote/' + this.params.vote, { json : true })
          // render a template
          .render('/client/views/vote.mustache')

          // swap the DOM with the new content
          .swap();
    });
  });

  app.run('#/');
});

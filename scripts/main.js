import Router from './router';

var App = Marionette.Application.extend({
	initialize: function() {
		this.router = new Router(this);
	},
	regions: {
		'main': '.app'
	}
});

var app = new App();

app.on('start', function() {
	if (Backbone.history) {
		Backbone.history.start();
	} else {
		console.log('no backbone router to start');
	}
});

$(document).ready(function(){
	app.start();
});
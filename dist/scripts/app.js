require.register("main", function(exports, require, module){
  'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var App = Marionette.Application.extend({
	initialize: function initialize() {
		this.router = new _router2['default'](this);
	},
	regions: {
		'main': '.app'
	}
});

var app = new App();

app.on('start', function () {
	if (Backbone.history) {
		Backbone.history.start();
	} else {
		console.log('no backbone router to start');
	}
});

$(document).ready(function () {
	app.start();
});
  
});

require.register("router", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _viewsTest = require('./views/test');

var _viewsTest2 = _interopRequireDefault(_viewsTest);

exports['default'] = Marionette.AppRouter.extend({
	routes: {
		'': 'index'
	},

	initialize: function initialize(app) {
		this.app = app;
	},

	index: function index() {
		var test = new _viewsTest2['default']();
		this.app.getRegion('main').show(test);
	}
});
module.exports = exports['default'];
  
});

require.register("views/test", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = Marionette.ItemView.extend({
	template: 'test.dust'
});
module.exports = exports['default'];
  
});

//# sourceMappingURL=app.js.map

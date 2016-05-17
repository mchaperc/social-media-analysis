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

var _viewsActorCollectionView = require('./views/actor-collection-view');

var _viewsActorCollectionView2 = _interopRequireDefault(_viewsActorCollectionView);

var _modelsActorModel = require('../models/actor-model');

var _collectionsActorCollection = require('../collections/actor-collection');

exports['default'] = Marionette.AppRouter.extend({
	routes: {
		'': 'index'
	},

	initialize: function initialize(app) {
		this.app = app;
	},

	index: function index() {
		var actorData = new _collectionsActorCollection.actorCollection();
		actorData.fetch().then((function (data) {
			var actorView = new _viewsActorCollectionView2['default']({ collection: actorData });
			this.app.getRegion('main').show(actorView);
		}).bind(this));
	}
});
module.exports = exports['default'];
  
});

require.register("collections/actor-collection", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _modelsActorModel = require('../models/actor-model');

var actorCollection = Backbone.Collection.extend({

	model: _modelsActorModel.actorModel,
	url: 'https://nuvi-challenge.herokuapp.com/activities'

});

exports['default'] = { actorCollection: actorCollection };
module.exports = exports['default'];
  
});

require.register("models/actor-model", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var actorModel = Backbone.Model.extend({

	idAttribute: 'id',
	url: 'https://nuvi-challenge.herokuapp.com/activities',
	defaults: {
		actor_username: '',
		actor_description: '',
		actor_name: '',
		actor_avatar: '',
		actor_url: '',
		provider: '',
		activity_url: '',
		activity_longitude: null,
		activity_latitude: null,
		activity_date: '',
		activity_message: '',
		activity_likes: 0,
		activity_shares: 0,
		activity_comments: 0,
		activity_attachment: null,
		activity_attachment_type: null,
		activity_sentiment: 0
	}
});

exports['default'] = { actorModel: actorModel };
module.exports = exports['default'];
  
});

require.register("views/actor-collection-view", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _modelsActorModel = require('../models/actor-model');

var _collectionsActorCollection = require('../collections/actor-collection');

var _actorItemView = require('./actor-item-view');

var _actorItemView2 = _interopRequireDefault(_actorItemView);

exports['default'] = Marionette.CompositeView.extend({
  template: 'actor-collection-view.dust',
  childView: _actorItemView2['default'],
  childViewContainer: '.row > ul',
  initialize: function initialize() {
    this.originalCollection = this.collection;
  },
  filter: function filter(child, index, collection) {
    return index < this.selectedIndices + 25;
  },
  templateHelpers: function templateHelpers() {
    return {
      beginningIndex: this.selectedIndices + 1,
      endingIndex: this.selectedIndices + 25
    };
  },
  selectedIndices: 0
});
module.exports = exports['default'];
  
});

require.register("views/actor-item-view", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _modals = require('./modals');

var _modals2 = _interopRequireDefault(_modals);

exports['default'] = Marionette.ItemView.extend({

	template: 'actor-item-view.dust',
	tagName: 'li',
	events: {
		'click .trigger-modal': 'openModal'
	},
	initialize: function initialize() {},
	onShow: function onShow() {
		$('.modal-trigger').leanModal();
	},
	openModal: function openModal(e) {
		e.preventDefault();
		this.modalView = new _modals2['default']({ model: this.model });
		this.modalView.render();
		$('body').append(this.modalView.el);
		$('#modal' + this.model.get('id')).openModal();
	}
});
module.exports = exports['default'];
  
});

require.register("views/modals", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = Marionette.ItemView.extend({

	template: 'modal.dust',
	className: 'modal-container',
	events: {
		'click .close-modal': 'modalDestroy'
	},
	initialize: function initialize() {
		console.log('hello');
	},
	modalDestroy: function modalDestroy(e) {
		e.preventDefault();
		$('#modal' + this.model.get('id')).closeModal();
		this.destroy();
	}

});
module.exports = exports['default'];
  
});

//# sourceMappingURL=app.js.map

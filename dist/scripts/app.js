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
  events: {
    'click .page-num': 'changePage'
  },
  initialize: function initialize() {
    this.originalCollection = this.collection;
  },
  filter: function filter(child, index, collection) {
    return index > this.selectedIndices && index < this.selectedIndices + 25;
  },
  templateHelpers: function templateHelpers() {
    var pageNums = Math.ceil(this.originalCollection.models.length / 25) || 0;
    return {
      beginningIndex: this.selectedIndices + 1,
      endingIndex: this.selectedIndices + 25,
      pages: new Array(pageNums)
    };
  },
  changePage: function changePage(e) {
    e.preventDefault();
    var targetPage = e && e.target && e.target.id || 0;
    this.selectedIndices = targetPage * 25;
    this.render();
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
		'click .trigger-modal': 'openModal',
		'click .fa-heart': 'unLikePost',
		'click .fa-heart-o': 'likePost',
		'submit form': 'submitComment'
	},
	ui: {
		'likeLink': '.like-link'
	},
	initialize: function initialize() {
		this.listenTo(this.model, 'change', this.render);
		if (!this.model.get('liked')) {
			this.model.set('liked', false);
		}
		var eventsChannel = Backbone.Radio.channel('eventsChannel');
		this.listenTo(eventsChannel, 'shared:post', this.sharedPost);
	},
	onShow: function onShow() {
		eventDelegation: {}
	},
	templateHelpers: function templateHelpers() {
		var date = this.model.get('activity_date').split('');
		var temp = date.splice(0, 4);
		temp.unshift('-');
		date.shift('-');
		date = date.concat(temp);
		return {
			date: date.join('')
		};
	},
	likePost: function likePost(e) {
		e.preventDefault();
		!this.model.get('liked') ? this.model.set('activity_likes', this.model.get('activity_likes') + 1) && this.model.set('liked', true) : this.model.set('activity_likes', this.model.get('activity_likes') - 1) && this.model.set('liked', false);
		this.$('.fa-heart-o').addClass('fa-heart');
		this.$('.fa-heart-o').removeClass('fa-heart-o');
	},
	unLikePost: function unLikePost(e) {
		e.preventDefault();
		!this.model.get('liked') ? this.model.set('activity_likes', this.model.get('activity_likes') + 1) && this.model.set('liked', true) : this.model.set('activity_likes', this.model.get('activity_likes') - 1) && this.model.set('liked', false);
		this.$('.fa-heart').addClass('fa-heart-o');
		this.$('.fa-heart').removeClass('fa-heart');
	},
	submitComment: function submitComment(e) {
		e.preventDefault();
		if (this.$('textarea').val()) {
			this.model.set('activity_comments', this.model.get('activity_comments') + 1);
		}
	},
	openModal: function openModal(e) {
		e.preventDefault();
		this.modalView = new _modals2['default']({ model: this.model });
		this.modalView.render();
		$('body').append(this.modalView.el);
		$('#modal' + this.model.get('id')).openModal();
	},
	sharedPost: function sharedPost() {
		this.model.set('activity_shares', this.model.get('activity_shares') + 1);
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
		'click .cancel-share': 'modalDestroy',
		'click .more-inputs': 'moreInputs',
		'click .share-post': 'sharePost'
	},
	initialize: function initialize() {},
	modalDestroy: function modalDestroy(e) {
		e && e.preventDefault();
		$('#modal' + this.model.get('id')).closeModal();
		this.destroy();
	},
	sharePost: function sharePost(e) {
		e.preventDefault();
		var isValid = true;
		if (this.checkValidation()) {
			Backbone.Radio.trigger('eventsChannel', 'shared:post');
			this.modalDestroy();
		}
	},
	moreInputs: function moreInputs(e) {
		e.preventDefault();
		$('#modal' + this.model.get('id') + ' .input-field').append('<input class="validate" type="email" id="emailInput" required>');
	},
	checkValidation: function checkValidation() {
		var isValid = true;
		$('#emailInput').each(function (idx, val) {
			var emailVal = $(val).val();
			emailVal && emailVal.indexOf('@') > -1 && emailVal.indexOf('.') > -1 ? null : isValid = false;
		});
		return isValid;
	}

});
module.exports = exports['default'];
  
});

//# sourceMappingURL=app.js.map

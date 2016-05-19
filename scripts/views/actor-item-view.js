import ModalView from './modals';

export default Marionette.ItemView.extend({

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
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		if (!this.model.get('liked')) {
			this.model.set('liked', false);
		}
		const eventsChannel = Backbone.Radio.channel('eventsChannel');
		this.listenTo(eventsChannel, 'shared:post', this.sharedPost);
	},
	onShow: function() {
		eventDelegation: {

		}
	},
	templateHelpers: function() {
		let date = this.model.get('activity_date').split('');
		let temp = date.splice(0,4);
		temp.unshift('-');
		date.shift('-');
		date = date.concat(temp);
		return {
			date: date.join('')
		}
	},
	likePost: function(e) {
		e.preventDefault();
		!this.model.get('liked') ? this.model.set('activity_likes', this.model.get('activity_likes') + 1) && this.model.set('liked', true) : this.model.set('activity_likes', this.model.get('activity_likes') - 1) && this.model.set('liked', false);
		this.$('.fa-heart-o').addClass('fa-heart');
		this.$('.fa-heart-o').removeClass('fa-heart-o');
	},
	unLikePost: function(e) {
		e.preventDefault();
		!this.model.get('liked') ? this.model.set('activity_likes', this.model.get('activity_likes') + 1) && this.model.set('liked', true) : this.model.set('activity_likes', this.model.get('activity_likes') - 1) && this.model.set('liked', false);
		this.$('.fa-heart').addClass('fa-heart-o');
		this.$('.fa-heart').removeClass('fa-heart');
	},
	submitComment: function(e) {
		e.preventDefault();
		if (this.$('textarea').val()) {
			this.model.set('activity_comments', this.model.get('activity_comments') + 1);
		}
	},
	openModal: function(e) {
		e.preventDefault();
		this.modalView = new ModalView({model: this.model});
		this.modalView.render();
		$('body').append(this.modalView.el);
		$('#modal' + this.model.get('id')).openModal();
		
	},
	sharedPost: function() {
		this.model.set('activity_shares', this.model.get('activity_shares') + 1);
	}

});


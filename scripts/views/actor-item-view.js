import ModalView from './modals';

export default Marionette.ItemView.extend({

	template: 'actor-item-view.dust',
	tagName: 'li',
	events: {
		'click .trigger-modal': 'openModal'
	},
	initialize: function() {
	},
	onShow: function() {
		$('.modal-trigger').leanModal();
	},
	openModal: function(e) {
		e.preventDefault();
		this.modalView = new ModalView({model: this.model});
		this.modalView.render();
		$('body').append(this.modalView.el);
		$('#modal' + this.model.get('id')).openModal();
		
	}
});
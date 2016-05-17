export default Marionette.ItemView.extend({

	template: 'modal.dust',
	className: 'modal-container',
	events: {
		'click .close-modal': 'modalDestroy'
	},
	initialize: function() {
		console.log('hello');
	},
	modalDestroy: function(e) {
		e.preventDefault();
		$('#modal' + this.model.get('id')).closeModal();
		this.destroy();
	}

});
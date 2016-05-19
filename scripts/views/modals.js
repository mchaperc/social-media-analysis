export default Marionette.ItemView.extend({

	template: 'modal.dust',
	className: 'modal-container',
	events: {
		'click .cancel-share': 'modalDestroy',
		'click .more-inputs': 'moreInputs',
		'click .share-post': 'sharePost'
	},
	initialize: function() {
		
	},
	modalDestroy: function(e) {
		e && e.preventDefault();
		$('#modal' + this.model.get('id')).closeModal();
		this.destroy();
	},
	sharePost: function(e) {
		e.preventDefault();
		let isValid = true;
		if (this.checkValidation()) {
			Backbone.Radio.trigger('eventsChannel', 'shared:post');
			this.modalDestroy();
		}
	},
	moreInputs: function(e) {
		e.preventDefault();
		$('#modal' + this.model.get('id') + ' .input-field').append('<input class="validate" type="email" id="emailInput" required>');
	},
	checkValidation: function() {
		let isValid = true;
		$('#emailInput').each(function(idx, val) {
			let emailVal = $(val).val();
			emailVal && emailVal.indexOf('@') > -1 && emailVal.indexOf('.') > -1 ? null : isValid = false;
		});
		return isValid;
	}

});
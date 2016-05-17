const actorModel = Backbone.Model.extend({

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

export default {actorModel};
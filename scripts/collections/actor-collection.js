import {actorModel} from '../models/actor-model';

let actorCollection = Backbone.Collection.extend({
	
	model: actorModel,
	url: 'https://nuvi-challenge.herokuapp.com/activities'

});

export default {actorCollection};
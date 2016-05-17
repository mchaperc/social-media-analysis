import ActorCollectionView from './views/actor-collection-view';
import {actorModel} from '../models/actor-model';
import {actorCollection} from '../collections/actor-collection';

export default Marionette.AppRouter.extend({
	routes: {
		'': 'index'
	},

	initialize: function(app) {
		this.app = app;
	},

	index: function() {
		let actorData = new actorCollection();
		actorData.fetch().then(function(data) {
			let actorView = new ActorCollectionView({collection: actorData});
			this.app.getRegion('main').show(actorView);
		}.bind(this));
	}
});
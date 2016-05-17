import {actorModel} from '../models/actor-model';
import {actorCollection} from '../collections/actor-collection';
import actorItemView from './actor-item-view';

export default Marionette.CompositeView.extend({
	template: 'actor-collection-view.dust',
	childView: actorItemView,
	childViewContainer: '.row > ul',
	initialize: function() {
		this.originalCollection = this.collection;
	},
	filter: function (child, index, collection) {
      return index < this.selectedIndices + 25;
    },
    templateHelpers: function() {
    	return {
    		beginningIndex: this.selectedIndices + 1,
    		endingIndex: this.selectedIndices + 25
    	}
    },
    selectedIndices: 0
});
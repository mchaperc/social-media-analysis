import {actorModel} from '../models/actor-model';
import {actorCollection} from '../collections/actor-collection';
import actorItemView from './actor-item-view';

export default Marionette.CompositeView.extend({
	template: 'actor-collection-view.dust',
	childView: actorItemView,
	childViewContainer: '.row > ul',
	events: {
		'click .page-num': 'changePage'
	},
	initialize: function() {
		this.originalCollection = this.collection;
	},
	filter: function (child, index, collection) {
      return index > this.selectedIndices && index < this.selectedIndices + 25;
    },
    templateHelpers: function() {
    	let pageNums = Math.ceil(this.originalCollection.models.length/25) || 0;
    	return {
    		beginningIndex: this.selectedIndices + 1,
    		endingIndex: this.selectedIndices + 25,
    		pages: new Array(pageNums)
    	}
    },
    changePage: function(e) {
    	e.preventDefault();
    	let targetPage = e && e.target && e.target.id || 0;
    	this.selectedIndices = targetPage * 25;
    	this.render();
    },
    selectedIndices: 0
});
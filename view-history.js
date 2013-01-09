/**
 * @author: mg12 [http://www.neoease.com/]
 * @update: 2013/01/09
 */

ViewHistory = function() {

	this.config = {
		limit: 10,
		storageKey: 'viewHistory',
		primaryKey: 'url'
	};
};

ViewHistory.prototype = {

	init: function(config) {
		this.config = config || this.config;
	},

	addHistory: function(item) {
		var items = this.getHistories();
		for(var i=0, len=items.length; i<len; i++) {
			if(item[this.config.primaryKey] && items[i][this.config.primaryKey] && item[this.config.primaryKey] === items[i][this.config.primaryKey]) {
				items.splice(i, 1);
				break;
			}
		}

		items.push(item);

		if(this.config.limit > 0 && items.length > this.config.limit) {
			items.splice(0, 1);
		}

		var json = JSON.stringify(items);
		localStorage.setItem(this.config.storageKey, json);
	},

	getHistories: function() {
		var history = localStorage[this.config.storageKey];
		if(history) {
			return JSON.parse(history);
		}
		return [];
	}
};

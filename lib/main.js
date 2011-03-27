const widgets = require("widget");
const tabs = require("tabs");
const pageWorkers = require("page-worker");

var widget = widgets.Widget({
	id: "jHS",
	label: "jHS",
	contentURL: "http://www.mozilla.org/favicon.ico",
	onClick: function() {
		// Create a new pageWorker
		pageWorkers.Page({
			contentURL: tabs.activeTab.url,
			contentScript: 'for (var b in window) {' +
				'if (window.hasOwnProperty(b)) {' +
					'console.log(b);' +
				'}}',
			contentScriptWhen: 'ready',
			onMessage: function(message) {
				console.log(message);
			}
		});
	}
});

console.log("The add-on is running.");

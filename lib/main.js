const widgets = require("widget");
const tabs = require("tabs");
const pageMod = require("page-mod");

var widget = widgets.Widget({
	id: "jHS",
	label: "jHS",
	contentURL: "http://www.mozilla.org/favicon.ico",
	onClick: function() {
		// Create a new pageWorker
		pageMod.PageMod({
			include: tabs.activeTab.url,
			contentScript:
				'onMessage = function(message) {' +
					'switch(message) {' +
						// Dump variables
						'case "dump":' +
							'for (var b in window) {' +
								'if (window.hasOwnProperty(b)) {' +
									'postMessage(b+" has value "+window[b]);' +
								'}' +
							'}' +
							'break;' +
							
						// Draw the user interface
						'case "loadui":' +
							'body = document.getElementsByTagName("body")[0];' +
							'ele = document.createElement("div"); ele.style = "background-color: black;";' +
							'text = document.createTextNode("This is dah text"); ele.appendChild(text);' +
							'break;' +
					'}' +
				'}',
			onAttach: function(worker) {
				worker.on('message', function(message) {
					// Got a message from the worker
					//console.log(message);
				});
				// Temporary debug code
				worker.postMessage('dump');
				worker.postMessage('loadui');
			},
			contentScriptWhen: 'ready',
			onMessage: function(message) {
				console.log(message);
			}
		});
	}
});

console.log(" * The add-on is running.");

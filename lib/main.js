const widgets = require("widget");
const tabs = require("tabs");
const pageMod = require("page-mod");
const data = require("self").data;

var widget = widgets.Widget({
    id: "jHS",
    label: "jHS",
    contentURL: "http://www.mozilla.org/favicon.ico",
    onClick: function() {
	// Create a new pageWorker
	pageMod.PageMod({
	    include: '*',
	    contentScriptFile: data.url('inject.js'),
	    contentScriptWhen: 'ready',
	    onAttach: function onAttach(worker) {
		worker.on('message', function(data) {
		    console.log(data);
		});
		worker.postMessage('dump');
	    }
	});
    }
});

console.log("[*] jHS is running.");

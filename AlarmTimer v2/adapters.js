var storage = typeof window.opera === "object" ? widget.preferences : localStorage;
var button = null, settimestatus, timestatus, activebutton, message_listener;

activebutton = function () { };


    message_listener = function (callback) {
        browser.runtime.onMessage.addListener(callback);
    };

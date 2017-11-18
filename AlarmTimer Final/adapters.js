var storage = typeof window.opera === "object" ? widget.preferences : localStorage;
var button = null, settimestatus, timestatus, activebutton, message_listener;

activebutton = function () { };
    updatetimestatus = function (mleft) {
        browser.browserAction.setBadgeText({text: (mleft >= 1 ? (mleft > 99 ? "99+" : mleft) : "<1").toString()});
    };
    hidetimestatus = function (color) {
        browser.browserAction.setBadgeText({text: ''});
        if (color) browser.browserAction.setBadgeBackgroundColor({color: color});
    };
    settimestatus = function (text, color) {
        browser.browserAction.setBadgeBackgroundColor({color: color});
        browser.browserAction.setBadgeText({text: text});
    };
    message_listener = function (callback) {
        browser.runtime.onMessage.addListener(callback);
    };


var delay = 19000;
var storage = typeof window.opera === "object" ? widget.preferences : localStorage;
var timerstatus = false;

window.addEventListener("load",
    function() {
        var form = document.forms[0].elements,
            m = form["minutes"],
            s = form["seconds"],
            butt = form["button"];

        if (!!storage["minutes"] && !isNaN(parseInt(storage["minutes"], 10))) {
            m.value = parseInt(storage["minutes"], 10);
        } else {
            m.value = 10;
            storage["minutes"] = 10;
        }
        if (!!storage["seconds"] && !isNaN(parseInt(storage["seconds"], 10)) && parseInt(storage["seconds"], 10) < 60) {
            s.value = parseInt(storage["seconds"], 10);
        } else {
            s.value = 30;
            storage["seconds"] = 30;
        }

        timerstatus = ((parseInt(storage["stop_time"], 10) || 0) + delay > Date.now());
        if (timerstatus) {
            m.disabled = true;
            s.disabled = true;
            butt.value = "Stop";
        } else {
            m.disabled = false;
            s.disabled = false;
            butt.value = "Start";
            m.focus();
        }
        document.forms[0].addEventListener("submit", onFormSubmit, false);
    }, false
);

function onFormSubmit(event) {
    var form = document.forms[0].elements,
        m = form["minutes"],
        s = form["seconds"],
        status = "STOP",
        mvalue = parseInt(m.value, 10),
        svalue = parseInt(s.value, 10);

    m.style.borderColor = "#72a4f3";
    s.style.borderColor = "#72a4f3";

    if (isNaN(mvalue) || isNaN(svalue)) {
        if (isNaN(mvalue)) {
            m.style.borderColor = "#ff5512";
        }
        if (isNaN(svalue)) {
            s.style.borderColor = "#ff5512";
        }
        event.preventDefault();
    } else {
        if ( mvalue === 0 && svalue < 10) return;
        storage["minutes"] = mvalue;
        storage["seconds"] = svalue;

        if (!timerstatus) {
            storage["stop_time"] = Date.now() + mvalue * 60000 + svalue * 1000;
            status = "START";
            window.close();
        } else {
            storage["stop_time"] = 0;
        }

    }
}

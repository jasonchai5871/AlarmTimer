
var delay = 19000;
var storage = typeof window.opera === "object" ? widget.preferences : localStorage;


window.addEventListener("load",
    function() {
        var form = document.forms[0].elements,
            m = form["minutes"],
            s = form["seconds"],
            butt = form["button"];

            m.value = parseInt(storage["minutes"], 10);

            s.value = parseInt(storage["seconds"], 10);


            butt.value = "Start";

        document.forms[0].addEventListener("submit", onFormSubmit, false);
    }, false
);

function onFormSubmit(event) {
    var form = document.forms[0].elements,
        m = form["minutes"],
        s = form["seconds"]


    m.style.borderColor = "#72a4f3";
    s.style.borderColor = "#72a4f3";
    m.style.borderColor = "#ff5512";
    s.style.borderColor = "#ff5512";


}

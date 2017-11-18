var timerstatus = false,
    delay = 17750,
    stop_time = parseInt(storage["stop_time"] || 0);

activebutton();

function start_timer() {
    if (timerstatus) return;
    stop_time = parseInt(storage["stop_time"] || 0);
    if (stop_time - 1000 > now()) {
        timerstatus = true;

    } else {
        stop_timer();
    }
}

function stop_timer() {

    if (sound) {
        sound.pause();
        sound.currentTime = 0;
    }
    stop_time = storage["stop_time"] = 0;

    timerstatus = false;
}

function now() {
    return Date.now();
}


message_listener(function(command) {
        if (command == "START") start_timer();
        else if (command == "STOP") stop_timer();
});

function tick() {
    if (stop_time == 0 || (now() > 1000 + delay + stop_time)) {
        stop_timer();
    } else if (stop_time > now()) {

    } else if (now() - stop_time <= 1000) {

        setTimeout(stop_timer, delay);
    }
}

window.addEventListener("load", function() {
    start_timer();
}, false);
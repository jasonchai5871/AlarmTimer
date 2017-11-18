var sound = null,
    timer = null,
    timerstatus = false,
    volume = 0.5 ,
    delay = 17750,
    stop_time = parseInt(storage["stop_time"] || 0);

activebutton();

function start_timer() {
    if (timerstatus) return;
    stop_time = parseInt(storage["stop_time"] || 0);
    if (stop_time - 1000 > now()) {
        timerstatus = true;
        settimestatus("", "#318730");
        updatetimestatus(min_left());
        timer = window.setInterval(tick, 1000);
    } else {
        stop_timer();
    }
}

function stop_timer() {
    clearInterval(timer);
    if (sound) {
        sound.pause();
        sound.currentTime = 0;
    }
    stop_time = storage["stop_time"] = 0;
    hidetimestatus();
    timerstatus = false;
}

function now() {
    return Date.now();
}

function min_left() {
    return Math.round((stop_time - now()) / 60000);
}

message_listener(function(command) {
        if (command == "START") start_timer();
        else if (command == "STOP") stop_timer();
});

function tick() {
    if (stop_time == 0 || (now() > 1000 + delay + stop_time)) {
        stop_timer();
    } else if (stop_time > now()) {
        updatetimestatus(min_left());
    } else if (now() - stop_time <= 1000) {
        settimestatus("\u266A", "#DB2C19");
        clearInterval(timer);
        if (sound) {
            sound.volume = volume;
            sound.play();
        }
        setTimeout(stop_timer, delay);
    }
}

window.addEventListener("load", function() {
    sound = document.querySelector("audio");
    start_timer();
}, false);
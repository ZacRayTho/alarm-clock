const clock = document.getElementById("clock");
const alarm = document.getElementById("alarm");
const submit = document.getElementById("submit");
const set = document.getElementById("set");
let set2;
const format = document.getElementById("format");
let h12 = false;
const snooze = document.getElementById("snooze");
let test = new Date();
const audio = new Audio('sound/alarm.wav');

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// function time () {
//     let a = test.getHours();
//     let b = test.getMinutes();
//     let c = test.getSeconds();
//     const done = a + ":" + b  + ":" + c; 
//     return done;
// }

// EVERY SECOND UPDATE THE TIME AND SET IT TO THE CLOCK DIV
setInterval(function () {
    if (h12 == false) {
        test = new Date().toLocaleString('en-US', { hour12: false }).slice(0, 24)
    } else {
        test = new Date().toLocaleString('en-US', { hour12: true }).slice(0, 24)
    }
}, 1000);
// setInterval(function () {clock.innerHTML = time() + " " + test}, 1000);
setInterval(function () {
    clock.innerHTML = test;
}, 1000);

// "Create Alarm button click listener"
submit.addEventListener("click", () => {
    set.innerHTML = alarm.value;
    set2 = alarm.value;
    if (h12 == true){
        let h = set2.slice(0, 2);
        let temp = h;
        if (h > 12) {
            h = Number(h) - 12;
            set2.replace(temp, "0" + h);
        }
    }
})

// every second check if clock value equals alarm value
setInterval(function () {
    if (clock.innerHTML.slice(10, 18) == set.innerHTML + ":00") {
        audio.play();
        //snooze button 
        setTimeout(() => {
            if (confirm("snooze for 5?")) {
                audio.pause();
                audio.currentTime = 0;
                //cut the minutes from the time
                let x = set2.slice(3, 5);
                let temp = x;
                //add 5 minutes ,if over 59,subtract to "rollover" clock
                x = Number(x) + 5;
                if (x > 59) {
                    x -= 60;
                    let y = set2.slice(0, 2)
                    y = Number(y) + 1;
                    //check if format is 12h or 24h
                    if (h12 == false) {
                        if (y == 24) {
                            y -= 24;
                        }
                    }
                    else {
                        if (y == 13) {
                            y -= 12;
                        }
                    }
                    set.innerHTML = y + ":0" + x;
                    return;
                }
                let r = set2.replace(temp, x);
                if (x < 10) {
                    r = set2.replace(temp, "0" + x)
                }
                set.innerHTML = r;

            }
        }, 1000);
    }
}, 1000);

// Format button function
format.addEventListener("click", () => {
    if (h12 == false) {
        h12 = true;
    }
    else {
        h12 = false;
    }
})

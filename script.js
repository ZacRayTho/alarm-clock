const clock = document.getElementById("clock");
const calender = document.getElementById("calender")
const alarm = document.getElementById("alarm");
const submit = document.getElementById("submit");
const set = document.getElementById("set");
let set2;
const format = document.getElementById("format");
let h12 = false;
const snooze = document.getElementById("snooze");
let test = new Date();
const audio = new Audio('sound/alarm.wav');

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// function time () {
//     let a = test.getHours();
//     let b = test.getMinutes();
//     let c = test.getSeconds();
//     const done = a + ":" + b  + ":" + c; 
//     return done;
// }

// EVERY SECOND UPDATE THE TIME AND SET IT TO a variable
setInterval(function () {
    if (h12 == false) {
        test = new Date().toLocaleString('en-US', { hour12: false })//.slice(0, 24)
    } else {
        test = new Date().toLocaleString('en-US', { hour12: true })//.slice(0, 24)
    }

}, 1000);

//function to add 0 in front of single digit numbers 
function double(x) {
    if (x < 10) {
        return "0" + x;
    }
    else {
        return x;
    }
}

// convert time from 24h to 12h
function normTime(x) {
    if (h12 == true) {
        if (x > 12) {
            return x - 12;
        }
        else {
            return x;
        }
    }
}

//check if am or pm
function check() {
    if (h12 == true) {
        let test3 = new Date().getHours();
        if (test3 > 11) {
            return "PM";
        }
        else {
            return "AM";
        }
    }
}

// sets the display
setInterval(function () {
    let test2 = new Date();
    window.test2 = test2;
    // swap display between 24h and 12h
    if (h12 == true) {
        clock.innerHTML = normTime(test2.getHours()) + ":" + double(test2.getMinutes()) + ":" + double(test2.getSeconds()) + " " + check();
    }
    else {
        clock.innerHTML = test2.getHours() + ":" + double(test2.getMinutes()) + ":" + double(test2.getSeconds());
    }
    //calender stays the same
    calender.innerHTML = days[test2.getDay()] + ", " + month[test2.getMonth()] + " " + test2.getDate() + " " + test2.getFullYear();
}, 1000);

// "Create Alarm button click listener"
submit.addEventListener("click", () => {
    set.innerHTML = alarm.value;
    set2 = alarm.value;
    if (h12 == true) {
        let h = set2.slice(0, 2);
        let temp = h;
        if (h > 12) {
            h = Number(h) - 12;
            let set3 = set2.replace(temp, h);
            set.innerHTML = set3;
        }
    }
})

// every second check if clock value equals alarm value
setInterval(function () {
    let a;
    //check format 
    if (h12 == true) {

        a = test.slice(10, 17)
    }
    else {
        a = test.slice(10, 18)
    }
    //match time to set alarm
    if (a == set.innerHTML + ":00") {
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

                let r = z.replace(temp, x);
                if (x < 10) {
                    r = z.replace(temp, "0" + x)
                }
                set.innerHTML = r;

            }
        }, 1000);
    }
}, 1000);

// Format button function
format.addEventListener("click", () => {
    //get already set alarm and take just the hours
    let z = set.innerHTML;
    let b = z.slice(0, 2);
    if (h12 == false) {
        h12 = true;
        if (h12 == true) {
            //swap already set alarms from 24h to 12h
            if (b > 12) {
                set.innerHTML = z.replace(b, (b - 12));
            }

        }
    }
    else {
        h12 = false;
        //out of time before swap from 12h to 24h
    }
})

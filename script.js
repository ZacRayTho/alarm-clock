const clock = document.getElementById("clock");
const alarm = document.getElementById("alarm");
const submit = document.getElementById("submit");
const set = document.getElementById("set");
let test = new Date();

function time () {
    let a = test.getHours();
    let b = test.getMinutes();
    let c = test.getSeconds();
    const done = a + ":" + b  + ":" + c; 
    return done;
}
setInterval(function () {test = new Date()}, 1000);
setInterval(function () {clock.innerHTML = time()}, 1000);

submit.addEventListener("click", ()=>{
    set.innerHTML= alarm.value;
})

setInterval(function () {
    if (clock.innerHTML == set.innerHTML + ":0"){
        alert("ALARM")
    }
}, 1000);

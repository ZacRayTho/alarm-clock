const clock = document.getElementById("clock");
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


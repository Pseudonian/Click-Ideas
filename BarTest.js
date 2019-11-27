var ticksremaining = 120
var maxticksremaining = 120
var points = 0;
var upgradelevel = 0;
function lowerticks() {
    var q = 1
    ticksremaining -= 1;
    if (ticksremaining < 1) {
        ticksremaining = maxticksremaining
    }
    if (ticksremaining <= 40) {
        q *= 1.25
    }
    if (ticksremaining <= 20) {
        q *= 1.5/1.25
    }
    if (ticksremaining <= 10) {
        q *= 2/1.5
    }
    document.getElementById("displayticks").innerHTML = "In " + (ticksremaining/40).toPrecision(2) + " seconds, reward for clicking will be maximised."
    document.getElementById("displaygain").innerHTML = "You will gain " + (q * (5 * Math.pow((maxticksremaining - ticksremaining)/(maxticksremaining), 3))).toFixed(2) + " points by clicking now."
}

function gainPoints() {
    var basegain = 1;
    var multiplierone = 1;
    multiplierone *= (5 * Math.pow((maxticksremaining - ticksremaining)/(maxticksremaining), 3)).toPrecision(3)
        if (ticksremaining <= 40) {
            multiplierone *= 1.25
        }
        if (ticksremaining <= 20) {
            multiplierone *= 1.5/1.25
        }
        if (ticksremaining <= 10) {
            multiplierone *= 2/1.5
        }
    basegain *= multiplierone
    if (basegain < 0.1) {
        basegain = 0;
    }
    points += basegain * 100/100 * 100/100
    document.getElementById("displayresults").innerHTML = "You have gained " + basegain.toPrecision(3) + " points from last click."
    ticksremaining = maxticksremaining
    document.getElementById("displaypoints").innerHTML = "You have " + Math.floor(points) * 100/100 + " points."
}

function barSpeed() {
    maxticksremaining = 120;

    if (points > Math.pow(upgradelevel + 1, 2) * 5 && upgradelevel < 50) {
        upgradelevel += 1;
        points -= Math.pow(upgradelevel, 2) * 5
    }
    maxticksremaining *= (1 - upgradelevel / 100)
    document.getElementById("displaypoints").innerHTML = "You have " + Math.floor(points) * 100/100 + " points."
    document.getElementById("barspeeddescription").innerHTML = "Upgrade Bar Speed by 1%. [" + upgradelevel +"/50] Costs: " + 5 * Math.pow(upgradelevel + 1, 2) + " Points."
}

function moveBar() {
    var barWidth = 500 * (maxticksremaining - ticksremaining)/(maxticksremaining)
    var elem = document.getElementById("bar");
    elem.style.width = barWidth
}

window.onload = function() {
    setInterval(lowerticks, 25)
    setInterval(moveBar, 25)
}
var cash = 0
var cashGainBase = 1
var cashGainMulti = 1

function updateCash(){
    document.getElementById("playerCash").innerHTML = cash
    document.getElementById("playerCashGain").innerHTML = cashGainBase * cashGainMulti
}

function generationTick(){
    cash += cashGainBase * cashGainMulti
}


function changeSubTab(newTab) {
    alert(`Subtab Changed to ${newTab}`)
    var subTabNames = ["investorSubtab", "resourceSubtab"];
  
    for (i = 0; i < subTabNames.length; i++) {
      if (subTabNames[i] !== newTab) {
        document.getElementById(subTabNames[i]).style.display = "none";
      }
      if (subTabNames[i] == newTab) {
        document.getElementById(subTabNames[i]).style.display = "block";
      }
    }
}

function gameTick(){ //Global tick
    updateCash()
    investor.updateDisplay()
    
}

setInterval(function () { //Function that will run every milisecond
  gameTick();
}, 10);

setInterval(function () {
    generationTick()
}, 1000)

setInterval(function() { //Saves game every 10 seconds
  saveGame()
}, 10000)

var investor = {
    names: [
        "Primary Workforce Investor"
    ],
    updateDisplay: function(){
        for(i=0;i < this.names.length;i++){
            x = document.getElementById("investorDisplay").innerHTML = `<button><h4><img src='Assets/Investor_Head.png' width='10px' height='auto'/>${this.names[i]}</h4></button>`
        }
    },
}

//Below this is the code to save and load the game as well as reset it

function loadGame() { //Loads the game
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
    if (localStorage.getItem("gameSave") !== null) {
      if (typeof savedGame.cash !== "undefined") cash = savedGame.cash;
    }
}

function resetGame() { //Resets the game and user progress
    if (confirm("Are you positive you wish to reset?")) {
        var gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));

        return location.reload();
    }
}
function saveGame() { //Saves game
    var gameSave = {
      cash: cash,
    };

    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

window.onload = function(){
    loadGame()
}
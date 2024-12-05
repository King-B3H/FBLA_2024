var cash = 0

function updateCash(){
    document.getElementById("playerCash").innerHTML = cash
}

function incrementCash(){
    cash++
}




function gameTick(){ //Global tick
    updateCash()
}

setInterval(function () { //Function that will run every milisecond
  gameTick();
}, 100);

setInterval(function() { //Saves game every 10 seconds
  saveGame()
}, 10000)

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
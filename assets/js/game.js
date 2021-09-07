var playerName = "asdf"; //window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Android", "Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var round = 0;

window.alert("Welcome to Robot Gladiators!");

for (var i = 0; i < enemyNames.length && playerHealth > 0; i++) {
    window.alert("A wild " + enemyNames[i] + " has appeared.");

    while (playerHealth > 0 && enemyHealth > 0) {
        round++;
        window.alert("Round " + round);
        battle(enemyNames[i]);
    }

    enemyHealth = 50;
}        

function battle(enemyName) {
    var promptFight = window.prompt("Would you like to [Fight] or [Skip] this battle? Enter 'Fight' or 'Skip' to choose.");

    if ("fight".localeCompare(promptFight, 'en', {sensitivity: 'accent'}) === 0) {
        enemyHealth -= playerAttack;

        console.log("--------------------------------")
        console.log(playerName + " attacked " + enemyName);
        console.log(playerName + " delt " + playerAttack + " damage.");

        window.alert(playerName + " attacked.")

        if (enemyHealth > 0) {
            console.log(enemyName + " has " + enemyHealth + " health remaining.");

            window.alert(enemyName + " has " + enemyHealth + " health left.");

            playerHealth -= enemyAttack;

            console.log("--------------------------------")
            console.log(enemyName + " attacked " + playerName);
            console.log(enemyName + " delt " + enemyAttack + " damage.");

            window.alert(enemyName + " attacked.");

            if (playerHealth > 0) {
                console.log(playerName + " has " + playerHealth + " health remaining.");              
                
                window.alert(playerName + " has " + playerHealth + " health left.");
            }  
            else {
                window.alert(playerName + " has died in battle! Game Over!");
            }  
        }
        else {
            window.alert(enemyName + " has died.");
        }     
    }
    else if ("skip".localeCompare(promptFight, 'en', {sensitivity: 'accent'}) === 0) {
        var confirmSkip = window.confirm("Are you sure you'd like to skip?");

        if (confirmSkip) {
            window.alert(playerName + " has decided to skip this fight.");
            playerMoney -= 10;
            enemyHealth = 0;
        }
    }
    else {
        window.alert("Invalid input. Please enter 'Fight' or 'Skip'.");
    }
}
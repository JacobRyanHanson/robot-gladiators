var playerName = "asdf"; //window.prompt("What is your robot's name?");
var playerHealth;
var playerAttack;
var playerMoney;
var enemyNames = ["Roborto", "Android", "Trumble"];
var enemyHealth;
var enemyAttack;
var round;

window.alert("Welcome to Robot Gladiators!");

do {
    playerHealth = 10;
    playerAttack = 10;
    playerMoney = 10;
    enemyHealth = 50;
    enemyAttack = 12;
    round = 0;

    for (var i = 0; i < enemyNames.length && playerHealth > 0; i++) {
        window.alert("A wild " + enemyNames[i] + " has appeared.");
    
        while (playerHealth > 0 && enemyHealth > 0) {
            round++;
            window.alert("Round " + round);
            battle(enemyNames[i]);
        }
        enemyHealth = 50;
    }
    endGame();

    var playAgain = window.confirm("Would you like to play again?");
} while (playAgain === true);

window.alert("Thank you for playing Robot Gladiators!");

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

        if (confirmSkip && playerMoney >= 10) {
            window.alert(playerName + " has decided to skip this fight.");
            playerMoney -= 10;
            enemyHealth = 0;
        }
        else {
            window.alert([playerName + " has insufficient money to skip."]);
            round--;
        }
    }
    else {
        window.alert("Invalid input. Please enter 'Fight' or 'Skip'.");
        round--;
    }
}

function endGame() {
    if (playerHealth > 0) {
        window.alert("Final Score: " + playerMoney)
    }
    else {
        window.alert("You've lost your robot in battle.");
    }
}
var playerName = "asdf"; //window.prompt("What is your robot's name?");
var playerHealth = 12;
var playerAttack = 10;
var playerMoney = 10;

var enemyName = "Roberto";
var enemyHealth = 50;
var enemyAttack = 12;

window.alert("Welcome to Robot Gladiators!");

while (playerHealth > 0) {
    battle();
}

function battle() {
    var promptFight = window.prompt("Would you like to [Fight] or [Skip] this battle? Enter 'Fight' or 'Skip' to choose.");

    if ("fight".localeCompare(promptFight, 'en', {sensitivity: 'accent'}) === 0) {
        enemyHealth -= playerAttack;

        if (enemyHealth > 0) {
            console.log(playerName + " attacked " + enemyName);
            console.log(playerName + " delt " + playerAttack + " damage.");
            console.log(enemyName + " has " + enemyHealth + " health remaining.");

            window.alert(playerName + " attacked.")
            window.alert(enemyName + " has " + enemyHealth + " health left.");

            playerHealth -= enemyAttack;

            if (playerHealth > 0) {
                console.log(enemyName + " attacked " + playerName);
                console.log(enemyName + " delt " + enemyAttack + " damage.");
                console.log(playerName + " has " + playerHealth + " health remaining.");
                
                window.alert(enemyName + " attacked.");
                window.alert(playerName + " has " + playerHealth + " health left.");
            }  
            else {
                window.alert(playerName + " has died!");
            }  
        }
        else {
            window.alert(enemyName + " has died.");
        }     
    }
    else if ("skip".localeCompare(promptFight, 'en', {sensitivity: 'accent'}) === 0) {
        var confrimSkip = window.confirm("Are you sure you'd like to quit?");

        if (confirmSkip) {
            window.alert(playerName + " has decided to skip this fight.");
            playerMoney -= 2;
        }
    }
    else {
        window.alert("Invalid input. Please enter 'Fight' or 'Skip'.");
    }
}
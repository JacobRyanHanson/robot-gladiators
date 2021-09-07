var playerName = "asdf"; //window.prompt("What is your robot's name?");
var playerHealth;
var playerAttack;
var playerMoney;

var enemyNames = ["Roborto", "Android", "Trumble"];
var enemyHealth;
var enemyAttack;

window.alert("Welcome to Robot Gladiators!");

do {
    startGame();
    for (var i = 0; i < enemyNames.length && playerHealth > 0; i++) {
        enemyHealth = 50;
        window.alert("Round " + (i + 1));
        window.alert("A wild " + enemyNames[i] + " has appeared.");
        battle(enemyNames[i]);
        if (i < enemyNames.length - 1 && playerHealth > 0) {
            var shopConfirm = window.confirm("The shop is open. Would you like to visit?");
            if (shopConfirm) {
                shop();
            }   
        }    
    }
    endGame();
    var playAgain = window.confirm("Would you like to play again?");
} while (playAgain === true);

function startGame() {
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 100;
    enemyHealth = 50;
    enemyAttack = 12;
}

function battle(enemyName) {
    while (playerHealth > 0 && enemyHealth > 0) {
        var promptFight = window.prompt("Would you like to [Fight] or [Skip] this battle? Enter 'Fight' or 'Skip' to choose.");

        if ("fight".localeCompare(promptFight, 'en', {sensitivity: 'accent'}) === 0) {
            enemyHealth -= playerAttack;

            console.log("--------------------------------");
            console.log(playerName + " attacked " + enemyName);
            console.log(playerName + " delt " + playerAttack + " damage.");
            window.alert(playerName + " attacked.");

            if (enemyHealth > 0) {
                console.log(enemyName + " has " + enemyHealth + " health remaining.");
                window.alert(enemyName + " has " + enemyHealth + " health left.");

                playerHealth -= enemyAttack;

                console.log("--------------------------------");
                console.log(enemyName + " attacked " + playerName);
                console.log(enemyName + " delt " + enemyAttack + " damage.");
                window.alert(enemyName + " attacked.");

                if (playerHealth > 0) {
                    console.log(playerName + " has " + playerHealth + " health remaining.");              
                    window.alert(playerName + " has " + playerHealth + " health left.");
                }
                else {
                    window.alert(playerName + " has died.");
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
                break;
            }
            else {
                window.alert(playerName + " has insufficient currency to skip.");
            }
        }
        else {
            window.alert("Invalid input. Please enter 'Fight' or 'Skip'.");
        }
    }  
}

function shop() {
    var shopChoice = window.prompt("Would you like to [Refill] your health, [Upgrade] your attack or [Leave] the store?");
    if ("refill".localeCompare(shopChoice, 'en', {sensitivity: 'accent'}) === 0 && playerMoney >= 7) {
        window.alert("Refilling " + playerName + "'s health by 20 for 7 currency.")
        playerHealth += 20;
        playerMoney -= 7;
    }
    else if ("upgrade".localeCompare(shopChoice, 'en', {sensitivity: 'accent'}) === 0 && playerMoney >= 7) {
        window.alert("Upgrading " + playerName + "'s attack by 6 points for 7 currency.")
        playerAttack += 6;
        playerMoney -= 7;
    }
    else if ("leave".localeCompare(shopChoice, 'en', {sensitivity: 'accent'}) === 0) {
        window.alert(playerName + " left the store.");
    }
    else if (playerMoney < 7) {
        window.alert(playerName + " has insufficient currency to purchase.");
    }
    else {
        window.alert("Invalid input. Please enter 'Refill', 'Upgrade', or 'Leave'.")
        shop();
    }
}

function endGame() {
    if (playerHealth > 0) {
        window.alert("Final Score: " + playerMoney)
    }
    else {
        window.alert("Game Over");
    }
}
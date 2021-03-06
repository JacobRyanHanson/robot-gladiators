alert("Welcome to Robot Gladiators!");

var playerInfo = {
    name: getName(),
    health: 100,
    attack: 10,
    coins: 100,
    reset: function () {
        this.health = 100;
        this.attack = 10;
        this.coins = 100;
    },
    refillHealth: function () {
        this.health += 20;
        this.coins -= 7;
    },
    upgradeAttack: function () {
        this.attack += 6;
        this.coins -= 7;
    }
}

var enemyInfo = [{
        name: "Roborto",
        attack: randNum(10, 14)
    },
    {
        name: "Android",
        attack: randNum(10, 14)
    },
    {
        name: "Trumble",
        attack: randNum(10, 14)
    }
]

// Plays the game and interacts with the user.
do {
    playerInfo.reset();

    // Continues looping rounds between the player and enemies until the player dies or runs out of enemies to face.
    for (var i = 0; i < enemyInfo.length && playerInfo.health > 0; i++) {
        enemyInfo[i].health = randNum(40, 60);
        alert("Round " + (i + 1));
        alert("A wild " + enemyInfo[i].name + " has appeared.");
        battle(enemyInfo[i]);

        // Allows player to enter the shop so long as the last enemy has not been fought.
        if (i < enemyInfo.length - 1 && playerInfo.health > 0) {
            var shopConfirm = confirm("The shop is open. Would you like to visit?");
            if (shopConfirm) {
                shop();
            }
        }
    }
    endGame();
    var playAgain = confirm("Would you like to play again?");
} while (playAgain === true);

// Runs one round of battle between player and the enemy.
function battle(enemy) {

    // Randomly determines if the player or enemy goes first.
    var number = randNum(0, 1);
    var otherIndex = otherIndexCheck(number);
    var turnOrder = [number, otherIndex]

    var skip = false; //skip reset

    // Loops turns as long as neither the player or enemy dies and the player didn't skip.
    while (playerInfo.health > 0 && enemy.health > 0 && !skip) {

        // Alternates turns between the player and the enemy.
        for (var i = 0; i < turnOrder.length && !skip; i++) {
            if (turnOrder[i] === 0) {
                skip = playerTurn(enemy);
            } else {
                enemyTurn(enemy);
            }
        }
    }
}

function getName() {
    var name;
    do {
        name = prompt("What is your robot's name?");
    } while (!name); // Falsy value check.
    return name;
}

// Assigns index 1 of turnOrder based on the first random number.
function otherIndexCheck(number) {
    if (number === 1) {
        return 0;
    } else {
        return 1;
    }
}

// Runs the players turn allowing them to fight or skip.
function playerTurn(enemy) {
    var promptFight = prompt("Would you like to [Fight] or [Skip] this battle? Enter 'Fight' or 'Skip' to choose.");

    if ("fight".localeCompare(promptFight, 'en', {
            sensitivity: 'accent'
        }) === 0) {
        var damage = randNum(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);

        alert(playerInfo.name + " attacked.");

        console.log("--------------------------------");
        console.log(playerInfo.name + " attacked " + enemy.name);
        console.log(playerInfo.name + " delt " + damage + " damage.");
        console.log(enemy.name + " has " + enemy.health + " health remaining.");

        if (enemy.health > 0) {
            alert(enemy.name + " has " + enemy.health + " health left.");
        } else {
            alert(enemy.name + " has died.");
        }
    } else if ("skip".localeCompare(promptFight, 'en', {
            sensitivity: 'accent'
        }) === 0) {
        var confirmSkip = confirm("Are you sure you'd like to skip?");

        if (confirmSkip && playerInfo.coins >= 10) {
            alert(playerInfo.name + " has decided to skip this fight.");
            playerInfo.coins = Math.max(0, playerInfo.coins - 10);
            return true; //skip boolean
        } else {
            alert(playerInfo.name + " has insufficient coins to skip.");
            playerTurn(enemy);
        }
    } else {
        alert("Invalid input. Please enter 'Fight' or 'Skip'.");
        playerTurn(enemy);
    }
}

// Runs the enemy's turn allowing it to attack.
function enemyTurn(enemy) {
    if (enemy.health > 0) {
        var damage = randNum(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);

        alert(enemy.name + " attacked.");

        console.log("--------------------------------");
        console.log(enemy.name + " attacked " + playerInfo.name);
        console.log(enemy.name + " delt " + damage + " damage.");
        console.log(playerInfo.name + " has " + playerInfo.health + " health remaining.");

        if (playerInfo.health > 0) {
            alert(playerInfo.name + " has " + playerInfo.health + " health left.");
        } else {
            alert(playerInfo.name + " has died.");
        }
    } else {
        alert(enemy.name + " has died.");
    }
}

// Runs the shop allowing the player to refill health, upgrade attack, or leave.
function shop() {
    var shopChoice = prompt("Would you like to [1] refill your health, [2] upgrade your attack or [3] leave the store?");
    if (parseInt(shopChoice) === 1 && playerInfo.coins >= 7) {
        alert("Refilling " + playerInfo.name + "'s health by 20 for 7 coins.");
        playerInfo.refillHealth();
    } else if (parseInt(shopChoice) === 2 && playerInfo.coins >= 7) {
        alert("Upgrading " + playerInfo.name + "'s attack by 6 points for 7 coins.");
        playerInfo.upgradeAttack();
    } else if (parseInt(shopChoice) === 3) {
        alert(playerInfo.name + " left the store.");
    } else if (playerInfo.coins < 7) {
        alert(playerInfo.name + " has insufficient coins to purchase anything.");
    } else {
        alert("Invalid input. Please enter '1', '2', or '3'.");
        shop();
    }
}

// Generates a random number given a min and max.
function randNum(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1) + min);
    return num;
}

// Runs end of game tasks, namley highscore tracking.
function endGame() {
    if (playerInfo.health > 0) {
        alert("Final Score: " + playerInfo.coins);
        var highScore = localStorage.getItem(highScore);
        if (highScore === null) {
            highScore = 0;
        }

        if (playerInfo.coins > highScore) {
            localStorage.setItem("highScore", playerInfo.coins);
            localStorage.setItem("name", playerInfo.name);
            alert(playerInfo.name + " has a new high score of " + playerInfo.coins + ".");
        } else {
            alert(playerInfo.name + "'s highscore remains unchanged.");
        }

    } else {
        alert("Game Over");
    }
}
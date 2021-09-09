alert("Welcome to Robot Gladiators!");

//objects
var playerInfo = {
    name: getName(),
    health: 100,
    attack: 10,
    coins: 10,
    reset: function() {
        this.health = 100;
        this.attack = 10;
        this.coins = 10;
    },
    refillHealth: function() {
        this.health += 20;
        this.coins -= 7;
    },
    upgradeAttack: function() {
        this.attack += 6;
        this.coins -= 7;
    }
}

var enemyInfo = [
    {
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

var skip;

do {
    playerInfo.reset();
    for (var i = 0; i < enemyInfo.length && playerInfo.health > 0; i++) {
        enemyInfo[i].health = randNum(40, 60);
        alert("Round " + (i + 1));
        alert("A wild " + enemyInfo[i].name + " has appeared.");
        battle(enemyInfo[i]);
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

function battle(enemy) {
    var number = randNum(0, 1);
    var otherIndex = otherIndexCheck(number);
    var turnOrder = [number, otherIndex]
    skip = false; //skip reset

    while (playerInfo.health > 0 && enemy.health > 0 && !skip) {
        for (var i = 0; i < turnOrder.length  && !skip; i++) {
            if (turnOrder[i] === 0) {
                playerTurn(enemy);
            }
            else {
                enemyTurn(enemy);
            }
        }
    }  
}

function getName() {
    var name;
    do {
        name = prompt("What is your robot's name?");
    } while (!name); //falsy value check
    return name;
}

function otherIndexCheck(number) {
    if (number === 1) {
        return 0;
    }
    else {
        return 1;
    }
}

function playerTurn(enemy) {
    var promptFight = prompt("Would you like to [Fight] or [Skip] this battle? Enter 'Fight' or 'Skip' to choose.");

    if ("fight".localeCompare(promptFight, 'en', {sensitivity: 'accent'}) === 0) {
        var damage = randNum(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);

        alert(playerInfo.name + " attacked.");

        console.log("--------------------------------");
        console.log(playerInfo.name + " attacked " + enemy.name);
        console.log(playerInfo.name + " delt " + damage + " damage.");
        console.log(enemy.name + " has " + enemy.health + " health remaining.");

        if (enemy.health > 0) {               
            alert(enemy.name + " has " + enemy.health + " health left.");
        }
        else {
            alert(enemy.name + " has died.");
        }
    }
    else if ("skip".localeCompare(promptFight, 'en', {sensitivity: 'accent'}) === 0) {
        var confirmSkip = confirm("Are you sure you'd like to skip?");

        if (confirmSkip && playerInfo.coins >= 10) {
            alert(playerInfo.name + " has decided to skip this fight.");
            playerInfo.coins = Math.max(0, playerInfo.coins - 10);
            skip = true;
        }
        else {
            alert(playerInfo.name + " has insufficient coins to skip.");
            playerTurn(enemy);
        }
    }
    else {
        alert("Invalid input. Please enter 'Fight' or 'Skip'.");
        playerTurn(enemy);
    }
}

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
        }
        else {
            alert(playerInfo.name + " has died.");
        }
    }
    else {
        alert(enemy.name + " has died.");
    }
}

function shop() {
    var shopChoice = prompt("Would you like to [1] refill your health, [2] upgrade your attack or [3] leave the store?");
    if (parseInt(shopChoice) === 1 && playerInfo.coins >= 7) {
        alert("Refilling " + playerInfo.name + "'s health by 20 for 7 coins.");
        playerInfo.refillHealth();
    }
    else if (parseInt(shopChoice) === 2 && playerInfo.coins >= 7) {
        alert("Upgrading " + playerInfo.name + "'s attack by 6 points for 7 coins.");
        playerInfo.upgradeAttack();
    }
    else if (parseInt(shopChoice) === 3) {
        alert(playerInfo.name + " left the store.");
    }
    else if (playerInfo.coins < 7) {
        alert(playerInfo.name + " has insufficient coins to purchase anything.");
    }
    else {
        alert("Invalid input. Please enter '1', '2', or '3'.");
        shop();
    }
}

function randNum(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1) + min);
    return num;
}

function endGame() {
    if (playerInfo.health > 0) {
        alert("Final Score: " + playerInfo.coins);
    }
    else {
        alert("Game Over");
    }
}
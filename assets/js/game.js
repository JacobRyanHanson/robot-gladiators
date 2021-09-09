//objects
debugger;
var playerInfo = {
    name: getName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function() {
        this.health += 20;
        this.money -= 7;
    },
    upgradeAttack: function() {
        this.attack += 6;
        this.money -= 7;
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

alert("Welcome to Robot Gladiators!");

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

function getName() {
    var name;
    do {
        name = prompt("What is your robot's name?");
    } while (!name); //falsy value check
    return name;
}

function battle(enemy) {
    while (playerInfo.health > 0 && enemy.health > 0) {
        var promptFight = prompt("Would you like to [Fight] or [Skip] this battle? Enter 'Fight' or 'Skip' to choose.");

        if ("fight".localeCompare(promptFight, 'en', {sensitivity: 'accent'}) === 0) {
            var damage = randNum(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);

            console.log("--------------------------------");
            console.log(playerInfo.name + " attacked " + enemy.name);
            console.log(playerInfo.name + " delt " + damage + " damage.");
            alert(playerInfo.name + " attacked.");

            console.log(enemy.name + " has " + enemy.health + " health remaining.");
            if (enemy.health > 0) {
                alert(enemy.name + " has " + enemy.health + " health left.");

                var damage = randNum(enemy.attack - 3, enemy.attack);
                playerInfo.health = Math.max(0, playerInfo.health - damage);

                console.log("--------------------------------");
                console.log(enemy.name + " attacked " + playerInfo.name);
                console.log(enemy.name + " delt " + damage + " damage.");
                alert(enemy.name + " attacked.");

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
        else if ("skip".localeCompare(promptFight, 'en', {sensitivity: 'accent'}) === 0) {
            var confirmSkip = confirm("Are you sure you'd like to skip?");

            if (confirmSkip && playerInfo.money >= 10) {
                alert(playerInfo.name + " has decided to skip this fight.");
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                break;
            }
            else {
                alert(playerInfo.name + " has insufficient money to skip.");
            }
        }
        else {
            alert("Invalid input. Please enter 'Fight' or 'Skip'.");
        }
    }  
}

function shop() {
    var shopChoice = prompt("Would you like to [1] refill your health, [2] upgrade your attack or [3] leave the store?");
    if (parseInt(shopChoice) === 1 && playerInfo.money >= 7) {
        alert("Refilling " + playerInfo.name + "'s health by 20 for 7 money.");
        playerInfo.refillHealth();
    }
    else if (parseInt(shopChoice) === 2 && playerInfo.money >= 7) {
        alert("Upgrading " + playerInfo.name + "'s attack by 6 points for 7 money.");
        playerInfo.upgradeAttack();
    }
    else if (parseInt(shopChoice) === 3) {
        alert(playerInfo.name + " left the store.");
    }
    else if (playerInfo.money < 7) {
        alert(playerInfo.name + " has insufficient money to purchase.");
    }
    else {
        alert("Invalid input. Please enter 'Refill', 'Upgrade', or 'Leave'.");
        shop();
    }
}

function randNum(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1) + min);
    return num;
}

function endGame() {
    if (playerInfo.health > 0) {
        alert("Final Score: " + playerInfo.money);
    }
    else {
        alert("Game Over");
    }
}
import Shop from "/classes/Shop.js";
import Enemy from "/classes/Enemy.js";
import Round from "/classes/Round.js";
import Construct from "/classes/Construction.js";

const gameContainer = document.getElementById('gameContainer');

class Player {
    static element = document.createElement('div');
    static life = 10;
    static attack = 1;
    static gold = 0
    static freze = 0
    static kazakhstanBomb = 0

    static create() {
        Player.element.id = 'player';
        gameContainer.appendChild(Player.element);
    }

    
    static takeDamage(damage) {
            Player.life -= damage;
            document.getElementById('playerLife-counter').textContent = `Vida: ${Player.life}`;
            if (Player.life <= 0) {
                Player.remove();
            }
    }

    static improveAtack() {
        Player.attack = Player.attack + 1;
        Shop.refresh();
    }

    static improveResistence() {
        Player.life += 10;
        document.getElementById('playerLife-counter').textContent = `Vida: ${Player.life}`;
        Shop.refresh();
    }


    static purshaseFrozen(){
        Player.freze += 1
        document.getElementById('playerFreeze-counter').textContent = `Gelo: ${Player.freze}`
        Shop.refresh();
    }

    static purshasekazakhstanBomb(){
        Player.kazakhstanBomb += 1
        document.getElementById('playerBomb-counter').textContent = `Sobrecarga: ${Player.kazakhstanBomb}`
        Shop.refresh()
    }
    
    static construct() {
        Shop.exitShop();
        Construct.placeTower();
    }
    
    static obtainGold(quantity) {
        Player.gold += quantity;
        document.getElementById('gold-counter').textContent = `Ouro: ${Player.gold}`;
    }

    static loseGold(gold) {
        Player.gold -= gold;
        document.getElementById('gold-counter').textContent = `Ouro: ${Player.gold}`;
    }

    static remove() {
        const lastRound = Round.currentRound;
        const defeatedEnemies = Enemy.defeatEnemies;
    
        window.location.href = `/?round=${lastRound}&enemies=${defeatedEnemies}`;
    }
    
}

export default Player;
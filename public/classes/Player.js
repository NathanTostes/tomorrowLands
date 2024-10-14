import Construct from "/classes/Construction.js";
import Shop from "/classes/Shop.js";

const gameContainer = document.getElementById('gameContainer');

class Player {
    static element = document.createElement('div');
    static life = 10;
    static attack = 1;
    static gold = 0
    static shield = 0

    static create() {
        Player.element.id = 'player';
        gameContainer.appendChild(Player.element);
    }

    
    static takeDamage(damage) {

        if (Player.shield > 0) {
            if (Player.shield < damage) {
                let damageRemain = damage - Player.shield
                Player.shield = 0
                Player.life -= damageRemain
                document.getElementById('playerShield-counter').textContent = `Escudo: ${Player.shield}`
                document.getElementById('playerLife-counter').textContent = `Vida: ${Player.life}`               
            }else {
                Player.shield -= damage;
                document.getElementById('playerShield-counter').textContent = `Escudo: ${Player.shield}`
            }
        }
        else {
            Player.life -= damage;
            document.getElementById('playerLife-counter').textContent = `Vida: ${Player.life}`;
            if (Player.life <= 0) {
                Player.remove();
            }
        }
    }

    static improveAtack() {
        Player.attack = Player.attack + 1;
    }

    static regenerate() {
        Player.life = 10;
        document.getElementById('playerLife-counter').textContent = `Vida: ${Player.life}`;
    }
    static purshaseShield(){
        Player.shield += 2
        document.getElementById('playerShield-counter').textContent = `Escudo: ${Player.shield}`
    }

    static obtainGold(quantity) {
        Player.gold += quantity;
        document.getElementById('gold-counter').textContent = `Ouro: ${Player.gold}`;
    }

    static loseGold(gold) {
        Player.gold -= gold;
        document.getElementById('gold-counter').textContent = `Ouro: ${Player.gold}`;
    }

    static construct() {
        Shop.exitShop();
        Construct.placeTower();
    }

    static remove() {
        gameContainer.removeChild(Player.element);
        alert("Você foi derrotado!");
    }
}

export default Player;
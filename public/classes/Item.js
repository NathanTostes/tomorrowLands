import Player from "/classes/Player.js";
import Construction from "/classes/Construction.js";
import Shop from "/classes/Shop.js";

class Item {
    constructor(name, value, description, effect) {
        this.name = name;
        this.value = value;
        this.description = description;
        this.effect = effect;
    }

    static getIncreased(itemName) {
        switch (itemName) {
            case 'Poder':
                return Player.attack;
            case 'Regenerar':
                return 1;
            case 'Torre':
                return Construction.towers.length + 1;
            case 'Escudo':
                return 1;
            case 'Gelo':
                return Player.freze + 1;
            case 'Kazakhstan Bomb':
                return Player.kazakhstanBomb + 1 
            default:
                return 0;
        }
    }

    comprar() {
        if (Player.gold < this.value) {
            window.alert('Moedas insuficientes');
            return;
        }
        Player.loseGold(this.value);
        this.executeEffect();
    }

    executeEffect() {
        if (typeof Player[this.effect] === 'function') {
            Player[this.effect]();
        }
    }
}

export default Item;

import Player from "/classes/Player.js";

class Item {
    constructor(name, value, description, effect) {
        this.name = name;
        this.value = value;
        this.description = description;
        this.effect = effect;
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

import Player from "/classes/Player.js";
import Construction from "/classes/Construction.js";

class Item {
    constructor(name, value, description, effect, image) {
        this.name = name;
        this.value = value;
        this.description = description;
        this.effect = effect;
        this.image = image
    }

    static getIncreased(itemName) {
        switch (itemName) {
            case 'Poder':
                return Player.attack;
            case 'Vida':
                return Math.floor(Player.life / 10) + 1;
            case 'Void':
                return Construction.towers.length + 1;
            case 'Zero Absoluto':
                return Player.freze + 1;
            case 'Sobrecarga':
                return Player.kazakhstanBomb + 1 
            default:
                return 0;
        }
    }

    comprar() {
        if (Player.gold < this.value) {

            const alert = document.createElement('div');
            alert.innerHTML = `Moedas insuficientes`;
            alert.id = "final-round-alert";
            gameContainer.appendChild(alert);

            this.removeAlertGold(alert)

            return;
        }
        Player.loseGold(this.value);
        this.executeEffect();
    }

    removeAlertGold(alertElement){
        setTimeout(() => {
            alertElement.remove();
        }, 2000);
    }

    executeEffect() {
        if (typeof Player[this.effect] === 'function') {
            Player[this.effect]();
        }
    }
}

export default Item;

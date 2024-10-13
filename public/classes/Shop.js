import Player from "./Player.js";
import Round from "./Round.js";
const gameContainer = document.getElementById('gameContainer');

const shopOptions = {
    item1: {
        value: 10,
        description: 'Poder',
        comprar() {
            if(Player.gold < 10) {
                window.alert('Moedas insuficientes');
                return;
            }
            Player.loseGold(10);
            Player.improveAtack();
        }
    },
    item2: { 
        value: 20, 
        description: 'Regenerar', 
        comprar () {
            if(Player.gold < 20) {
                window.alert('Moedas insuficientes');
                return;
            }
            Player.loseGold(20);
            Player.regenerate();
        }
    },
    item3: {
        value: 20,
        description: 'Escudo',
        comprar() {
            console.log('rodando comprar');
            
            if (Player.gold < 20) {
                window.alert('Moedas insuficientes')
            }
            Player.loseGold(20)
            Player.purchaseShield()
        }
    }
};


class Shop {
    constructor() {
        this.createElements();
    }

    createElements() {
        this.createElementShop();
        this.createTitle();
        this.createButtonExit();
        this.createShopItems();
    }

    createElementShop() {
        this.elementShop = document.createElement('div')
        this.elementShop.id = 'shop';
        gameContainer.appendChild(this.elementShop);

    }

    createShopItems() {
        Object.keys(shopOptions).forEach((itemKey) => {
            const item = shopOptions[itemKey];
            const itemDiv = document.createElement('div');
            itemDiv.addEventListener('click', item.comprar);
            itemDiv.classList.add('shop-item');
            itemDiv.innerHTML = `<strong>${item.description}</strong><br>Valor: ${item.value}`;
            this.elementShop.appendChild(itemDiv);
        });
    }


    createTitle() {
        const title = document.createElement('p');
        title.innerHTML = `Loja`;
        title.id = 'shop-title';
        this.elementShop.appendChild(title);
    }

    createButtonExit() {
        const btnExit = document.createElement('div');
        btnExit.innerHTML = 'Sair';
        btnExit.id = 'shop-btnExit';
        btnExit.addEventListener('click', () => this.exitShop());
        this.elementShop.appendChild(btnExit);

    }

    exitShop() {
        this.elementShop.remove();
        Round.nextRound();
    }

}

export default Shop
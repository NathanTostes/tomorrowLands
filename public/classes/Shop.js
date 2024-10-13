import { loadItemsFromJSON } from '/storage/access.js';
import Round from '/classes/Round.js';

const gameContainer = document.getElementById('gameContainer');

class Shop {
    static items = [];

    static async initShop() {
        this.items = await loadItemsFromJSON();
        this.createElements();
    }

    static createElements() {
        this.createElementShop();
        this.createTitle();
        this.createButtonExit();
        this.createShopItems();
    }

    static createElementShop() {
        this.elementShop = document.createElement('div');
        this.elementShop.id = 'shop';
        gameContainer.appendChild(this.elementShop);
    }

    static createShopItems() {
        this.items.forEach((item) => {
            const itemDiv = document.createElement('div');
            itemDiv.addEventListener('click', () => item.comprar());
            itemDiv.classList.add('shop-item');
            itemDiv.innerHTML = `<strong>${item.description}</strong><br>Valor: ${item.value}`;
            this.elementShop.appendChild(itemDiv);
        });
    }

    static createTitle() {
        const title = document.createElement('p');
        title.innerHTML = `Loja`;
        title.id = 'shop-title';
        this.elementShop.appendChild(title);
    }

    static createButtonExit() {
        const btnExit = document.createElement('div');
        btnExit.innerHTML = 'Sair';
        btnExit.id = 'shop-btnExit';
        btnExit.addEventListener('click', () => Shop.exitShopAndReturnGame());
        this.elementShop.appendChild(btnExit);
    }

    static exitShop() {
        this.elementShop.remove();
    }

    static exitShopAndReturnGame() {
        this.elementShop.remove();
        Round.nextRound();
    }
}

export default Shop;

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
            itemDiv.classList.add('shop-item');
            console.log(item.image);
            
    
            const imageDiv = document.createElement('div');
            imageDiv.classList.add('item-image');
            imageDiv.style.backgroundImage = `url(${item.image})`;
            imageDiv.style.backgroundSize = 'cover';
            const itemDetails = document.createElement('div');
            itemDetails.classList.add('shop-item-details')
            itemDetails.innerHTML = `<strong>${item.description}</strong><br>Valor: ${item.value}`;
    
            itemDiv.appendChild(itemDetails);
            itemDiv.appendChild(imageDiv);
            this.elementShop.appendChild(itemDiv);
            itemDiv.addEventListener('click', () => {
                item.comprar();
            });
        });
    }
    
    
    static createTitle() {
        const title = document.createElement('p');
        title.innerHTML = `<strong>Upgrades: </strong>`;
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

    static refresh() {
        this.exitShop();
        this.initShop();
    }

    static exitShopAndReturnGame() {
        this.elementShop.remove();
        Round.nextRound();
    }
}

export default Shop;

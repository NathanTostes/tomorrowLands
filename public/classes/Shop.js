import Round from "./Round.js";
const gameContainer = document.getElementById('gameContainer')

class Shop {
    constructor() {
        this.createElementShop()
        this.createTitle()
        this.createButtonExit()
    }

    createElementShop(){
        this.elementShop = document.createElement('div')
        this.elementShop.id = 'shop';        
        gameContainer.appendChild(this.elementShop);

    }

    createTitle() {
        const title = document.createElement('p')
        title.innerHTML = `Loja`
        title.id = 'shop-title'
        this.elementShop.appendChild(title)
    }

    createButtonExit() {
        const btnExit = document.createElement('div')
        btnExit.innerHTML = 'Sair'
        btnExit.id = 'shop-btnExit'
        btnExit.addEventListener('click', () => this.exitShop());
        this.elementShop.appendChild(btnExit)

    }

    exitShop() {
        this.elementShop.remove()
        Round.nextRound()
    }

}

export default Shop
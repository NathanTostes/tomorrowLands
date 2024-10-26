import Shop from '/classes/Shop.js';
import Round from "/classes/Round.js";
import Enemy from "/classes/Enemy.js";

const gameContainer = document.getElementById("gameContainer")

class FinalScreen{

    static initFinalScreen(){
        this.createElements()
    }

    static createElements(){
        this.createDiv()
        this.createText()
        this.createButtonContinue()
        this.createButtonClose()
    }

    static createDiv(){
        this.div = document.createElement('div')
        this.div.id = "div-finalScreen"
        gameContainer.appendChild(this.div)
    }

    static createText(){
        this.text = document.createElement('p')
        this.text.id = 'text-finalScreen'
        this.text.innerHTML = 'texto'
        this.div.appendChild(this.text)
    }

    static createButtonContinue(){
        this.buttonContinue = document.createElement('div')
        this.buttonContinue.id = 'buttonContinue-finalScreen'
        this.buttonContinue.innerHTML = 'Continuar'
        this.buttonContinue.addEventListener('click', () => FinalScreen.closeFinalScreen());
        this.div.appendChild(this.buttonContinue)
    }

    static createButtonClose(){
        this.buttonClose = document.createElement('div')
        this.buttonClose.id = 'buttonClose-finalScreen'
        this.buttonClose.innerHTML = 'Sair'
        this.buttonClose.addEventListener('click', () => FinalScreen.loadInitialScreen());
        this.div.appendChild(this.buttonClose)
    }

    static closeFinalScreen(){
        console.log('rodadno');
        Shop.initShop()
        FinalScreen.removeElements()
    }

    static removeElements(){
        this.div.remove()
        this.text.remove()
        this.buttonClose.remove()
        this.buttonContinue.remove()
    }
}

export default FinalScreen
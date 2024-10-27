import Shop from '/classes/Shop.js';
import Round from "/classes/Round.js";
import Enemy from "/classes/Enemy.js";

const gameContainer = document.getElementById("gameContainer")

const text = `Em meio ao vazio, repleto de escuridão e caos, se fez a luz e a ordem. O Deus da criação venceu a interminável batalha contra si, e assim, do nada, tudo se fez.`

function typeWriterEffect(text, elementId, speed) {
    const element = document.getElementById(elementId);
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    type();
}

class FinalScreen{

    static initFinalScreen(){
        this.createElements()
        typeWriterEffect(text, 'text-finalScreen', 80);
    }

    static createElements(){
        this.createContent()
        this.createDiv()
        this.createText()
        this.createDivButtons()
        this.createButtonContinue()
        this.createButtonClose()
    }

    static createContent(){
        this.content = document.createElement('div')
        this.content.id = "content-finalScreen"
        gameContainer.appendChild(this.content)
    }

    static createDiv(){
        this.div = document.createElement('div')
        this.div.id = 'div-finalScreen'
        this.content.appendChild(this.div)
    }
    
    static createDivButtons(){
        this.divButtons = document.createElement('div')
        this.divButtons.id = 'divButtons-finalScreen'
        this.div.appendChild(this.divButtons)
    }

    static createText(){
        this.text = document.createElement('p')
        this.text.id = 'text-finalScreen'
        this.div.appendChild(this.text)
    }

    static createButtonContinue(){
        this.buttonContinue = document.createElement('div')
        this.buttonContinue.id = 'buttonContinue-finalScreen'
        this.buttonContinue.classList.add('buttons-finalScreen')
        this.buttonContinue.innerHTML = 'Continuar'
        this.buttonContinue.addEventListener('click', () => FinalScreen.closeFinalScreen());
        this.divButtons.appendChild(this.buttonContinue)
    }

    static createButtonClose(){
        this.buttonClose = document.createElement('div')
        this.buttonClose.id = 'buttonClose-finalScreen'
        this.buttonClose.classList.add('buttons-finalScreen')
        this.buttonClose.innerHTML = 'Sair'
        this.buttonClose.addEventListener('click', () => FinalScreen.loadInitialScreen());
        this.divButtons.appendChild(this.buttonClose)
    }

    static closeFinalScreen(){
        Shop.initShop()
        FinalScreen.removeElements()
    }

    static removeElements(){
        this.content.remove()
        this.div.remove()
        this.text.remove()
        this.buttonClose.remove()
        this.buttonContinue.remove()
    }

    static loadInitialScreen(){
        const lastRound = Round.currentRound;
        const defeatedEnemies = Enemy.defeatEnemies;
        window.location.href = `/?round=${lastRound}&enemies=${defeatedEnemies}`;   
    }
}

export default FinalScreen
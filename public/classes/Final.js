import Shop from '/classes/Shop.js';
import Round from "/classes/Round.js";
import Enemy from "/classes/Enemy.js";

const gameContainer = document.getElementById("gameContainer")

const text = `testtestt esttestte sttes ttesttestt esttes ttest testtest testtestt estt esttesttest sttestte sttestte sttest test`

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
        this.text.innerHTML = text
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
        Shop.initShop()
        FinalScreen.removeElements()
    }

    static removeElements(){
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
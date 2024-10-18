import { loadBossesFromJSON } from '/storage/access.js';
import Player from './Player.js';
import Round from './Round.js';

const gameContainer = document.getElementById('gameContainer');

class Boss {
    static types = [];
    static aliveEnemies = [];
    static defeatEnemies = 0;

    static async loadBossesTypes() {
        Boss.types = await loadBossesFromJSON();
    }

    constructor(bossStatus, roundDifficult) {

        console.log(bossStatus);
        

        this.element = document.createElement('div');
        this.element.classList.add('boss');
        this.element.id = bossStatus.type;
        
        const bossSize = parseInt(getComputedStyle(this.element).getPropertyValue('--boss-size')) || 30;

        const {velocity, life, gold} = bossStatus;
        this.velocity = velocity;
        this.life = life + roundDifficult;
        this.goldValue = gold;
        this.bossSize = bossSize;
        
        let x, y;
        const spawnDirection = Math.floor(Math.random() * 4);
        switch (spawnDirection) {
            case 0: // Topo
                x = Math.random() * (gameContainer.clientWidth - bossSize);
                y = -bossSize;
                break;
            case 1: // Direita
                x = gameContainer.clientWidth;
                y = Math.random() * (gameContainer.clientHeight - bossSize);
                break;
            case 2: // Fundo
                x = Math.random() * (gameContainer.clientWidth - bossSize);
                y = gameContainer.clientHeight;
                break;
            case 3: // Esquerda
                x = -bossSize;
                y = Math.random() * (gameContainer.clientHeight - bossSize);
                break;
        }

        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
        gameContainer.appendChild(this.element);

        this.element.addEventListener('click', () => this.hit(Player.attack));

        

    }

    hit(damage) {
        this.life -= damage;
        if (this.life <= 0) {
            this.remove();
        }
        console.log(this.life);
        

    }

    remove() {
        gameContainer.removeChild(this.element);

        const index = Boss.aliveEnemies.indexOf(this);
        if (index > -1) {
            Boss.aliveEnemies.splice(index, 1);
        }

        Boss.defeatEnemies++;
        document.getElementById('enemies-counter').textContent = `Inimigos derrotados: ${Boss.defeatEnemies}`;
        Round.checkAliveEnemies();
        Player.obtainGold(this.goldValue);
    }

    moveToPlayer(playerDirection) {
        const rectBoss = this.element.getBoundingClientRect();
        const bossCenterX = rectBoss.left + rectBoss.width / 2;
        const bossCenterY = rectBoss.top + rectBoss.height / 2;
        const playerCenterX = playerDirection.left + playerDirection.width / 2;
        const playerCenterY = playerDirection.top + playerDirection.height / 2;

        const deltaX = playerCenterX - bossCenterX;
        const deltaY = playerCenterY - bossCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance > 0) {
            const moveX = (deltaX / distance) * this.velocity;
            const moveY = (deltaY / distance) * this.velocity;
            this.element.style.left = (rectBoss.left + moveX) + 'px';
            this.element.style.top = (rectBoss.top + moveY) + 'px';
        }
    }

    static spawnBoss(roundDifficult) {

        let bossType = Math.floor(Math.random() * Boss.types.length)

        console.log(bossType);


        bossType = Boss.types[bossType]

        console.log("spawno boss");
        console.log(bossType);
        
        

        const boss = new Boss(bossType, roundDifficult);
        Boss.aliveEnemies.push(boss);
        
    }
}

export default Boss;

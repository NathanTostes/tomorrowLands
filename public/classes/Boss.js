import { loadBossesFromJSON } from '/storage/access.js';
import Player from './Player.js';
import Round from './Round.js';
import Enemy from './Enemy.js';

const gameContainer = document.getElementById('gameContainer');

class Boss {
    static types = [];
    static aliveBoss = [];
    static defeatEnemies = 0;

    static async loadBossesTypes() {
        Boss.types = await loadBossesFromJSON();
    }

    constructor(bossStatus, currentRound) {     
        const roundDifficult = 0.8 + currentRound * 0.2;

        this.element = document.createElement('div');
        this.element.classList.add('boss');
        this.element.id = bossStatus.type;
        
        const bossSize = parseInt(getComputedStyle(this.element).getPropertyValue('--boss-size')) || 30;

        const {velocity, life, gold, damage} = bossStatus;
        this.velocity = velocity;
        this.life = Math.floor(life * roundDifficult);
        this.goldValue = gold;
        this.bossSize = bossSize;
        this.damage = damage
        
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

        if (bossStatus.type === 'boss1') {
            this.spawnEnemiesOverTime();
        }

    }

    hit(damage) {
        this.life -= damage;
        if (this.life <= 0) {
            this.remove();
        }
    }

    remove() {
        gameContainer.removeChild(this.element);
        this.stopSpawningEnemies();

        const index = Boss.aliveBoss.indexOf(this);

        if (index > -1) {
            Boss.aliveBoss.splice(index, 1);
        }

        Enemy.defeatEnemies++;
        document.getElementById('enemies-counter').textContent = `Inimigos derrotados: ${Enemy.defeatEnemies}`;
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

    static spawnBoss(currentRound) {
        let bossType = Math.floor(Math.random() * Boss.types.length)

        bossType = Boss.types[bossType]      

        const boss = new Boss(bossType, currentRound);
        Boss.aliveBoss.push(boss);
    }

    spawnEnemiesOverTime() {

        this.spawnInterval = setInterval(() => {
            
                const bossX = parseFloat(this.element.style.left);
                const bossY = parseFloat(this.element.style.top);
                for (let i = 0; i < 2; i++) {
                    Enemy.spawnEnemyNearPosition(bossX, bossY);
                }
            }, 2000);
    }

    stopSpawningEnemies() {
        clearInterval(this.spawnInterval);
    }

}

export default Boss;

import { loadEnemiesFromJSON } from '/storage/access.js';
import Player from './Player.js';
import Round from './Round.js';

const gameContainer = document.getElementById('gameContainer');

class Enemy {
    static types = [];
    static aliveEnemies = [];
    static defeatEnemies = 0;

    static async loadEnemyTypes() {
        this.types = await loadEnemiesFromJSON();
    }

    constructor(enemyStatus, roundDifficult) {
        this.element = document.createElement('div');
        this.element.classList.add('enemy');
        this.element.id = enemyStatus.type;
        
        const enemySize = parseInt(getComputedStyle(this.element).getPropertyValue('--enemy-size')) || 30;

        const { velocity, life, gold } = enemyStatus;
        this.velocity = velocity;
        this.life = life + roundDifficult;
        this.goldValue = gold;
        this.enemySize = enemySize;
        
        let x, y;
        const spawnDirection = Math.floor(Math.random() * 4);
        switch (spawnDirection) {
            case 0: // Topo
                x = Math.random() * (gameContainer.clientWidth - enemySize);
                y = -enemySize;
                break;
            case 1: // Direita
                x = gameContainer.clientWidth;
                y = Math.random() * (gameContainer.clientHeight - enemySize);
                break;
            case 2: // Fundo
                x = Math.random() * (gameContainer.clientWidth - enemySize);
                y = gameContainer.clientHeight;
                break;
            case 3: // Esquerda
                x = -enemySize;
                y = Math.random() * (gameContainer.clientHeight - enemySize);
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
    }

    remove() {
        gameContainer.removeChild(this.element);

        const index = Enemy.aliveEnemies.indexOf(this);
        if (index > -1) {
            Enemy.aliveEnemies.splice(index, 1);
        }

        Enemy.defeatEnemies++;
        document.getElementById('enemies-counter').textContent = `Inimigos derrotados: ${Enemy.defeatEnemies}`;
        Round.checkAliveEnemies();
        Player.obtainGold(this.goldValue);
    }

    moveToPlayer(playerDirection) {
        const rectEnemy = this.element.getBoundingClientRect();
        const enemyCenterX = rectEnemy.left + rectEnemy.width / 2;
        const enemyCenterY = rectEnemy.top + rectEnemy.height / 2;
        const playerCenterX = playerDirection.left + playerDirection.width / 2;
        const playerCenterY = playerDirection.top + playerDirection.height / 2;

        const deltaX = playerCenterX - enemyCenterX;
        const deltaY = playerCenterY - enemyCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance > 0) {
            const moveX = (deltaX / distance) * this.velocity;
            const moveY = (deltaY / distance) * this.velocity;
            this.element.style.left = (rectEnemy.left + moveX) + 'px';
            this.element.style.top = (rectEnemy.top + moveY) + 'px';
        }
    }

    static spawnEnemy(roundDifficult) {
        let randomIndex = Math.floor(Math.random() * 100);
        let accumulatedChance = 0

        for (const element of Enemy.types) {
            
            accumulatedChance += element.spawn

            if (accumulatedChance > randomIndex) {
                let enemyType = element;
                
                
                const enemy = new Enemy(enemyType, roundDifficult);
                Enemy.aliveEnemies.push(enemy);
                break;  
            }
        }
    }
}

export default Enemy;

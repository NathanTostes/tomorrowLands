import { loadEnemiesFromJSON } from '/storage/access.js';
import Player from '/classes/Player.js';
import Round from '/classes/Round.js';

const gameContainer = document.getElementById('gameContainer');

class Enemy {
    static types = [];
    static aliveEnemies = [];
    static defeatEnemies = 0;
    static frozedActivated = false;

    static async loadEnemyTypes() {
        this.types = await loadEnemiesFromJSON();
    }

    constructor(enemyStatus, currentRound) {
        const roundDifficult = 0.8 + currentRound * 0.2;

        this.element = document.createElement('div');
        this.element.classList.add('enemy');
        this.element.id = enemyStatus.type;

        const enemySize = parseInt(getComputedStyle(this.element).getPropertyValue('--enemy-size')) || 30;

        const { velocity, life, gold } = enemyStatus;
        this.velocity = velocity;
        this.life = Math.floor(life * roundDifficult);
        this.goldValue = gold;
        this.enemySize = enemySize;
        this.isFrozen = false;

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
        Player.obtainGold(Math.round(this.goldValue * Round.currentRound / 2));
    }

    moveToPlayer(playerDirection) {
        if (this.isFrozen) {
            return
        };

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

    static pickRandonEnemyType () {
        const weightedEnemyList = [];

        for (const element of Enemy.types) {
            for (let i = 0; i < element.spawn; i++) {
                weightedEnemyList.push(element);
            }
        }

        const randomIndex = Math.floor(Math.random() * weightedEnemyList.length);
        return weightedEnemyList[randomIndex];
    }

    static spawnEnemy(currentRound) {
        const enemyType = this.pickRandonEnemyType();
        const enemy = new Enemy(enemyType, currentRound);
        Enemy.aliveEnemies.push(enemy);
    }

    static spawnEnemyNearPosition(x, y) {
        const enemyType = this.pickRandonEnemyType();
        const enemy = new Enemy(enemyType, Round.currentRound);

        enemy.element.style.left = `${x}px`;
        enemy.element.style.top = `${y}px`;

        Enemy.aliveEnemies.push(enemy);
    }
}

export default Enemy;

import Player from './Player.js';
import Round from '/classes/Round.js'

const enemyTypes = {
    enemy1: { velocity: 2, life: 1, gold: 1},
    enemy2: { velocity: 3, life: 1, gold: 2},
    enemy3: { velocity: 1, life: 2, gold: 2}
};

class Enemy {
    static aliveEnemies = [];
    static defeatEnemies = 0;

    constructor(type) {
        if (!enemyTypes[type]) {
            throw new Error(`Tipo de inimigo "${type}" não encontrado.`);
        }

        const { velocity, life } = enemyTypes[type];
        this.element = document.createElement('div');
        this.element.classList.add('enemy');
        this.element.id = type;
        
        const gameContainer = document.getElementById('gameContainer');
        const enemySize = parseInt(getComputedStyle(this.element).getPropertyValue('--enemy-size')) || 30;
        this.velocity = velocity;
        this.life = life;
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
        const gameContainer = document.getElementById('gameContainer');
        gameContainer.removeChild(this.element);
        
        const index = Enemy.aliveEnemies.indexOf(this);
        if (index > -1) {
            Enemy.aliveEnemies.splice(index, 1);
        }

        Enemy.defeatEnemies++;
        document.getElementById('enemies-counter').textContent = `Inimigos derrotados: ${Enemy.defeatEnemies}`;
        Round.checkAliveEnemies()
        Player.goldCounter(this.element)
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

    static spawnEnemy() {
        const randomValue = Math.random() * 100;
        let enemyType;
        
        if (randomValue > 50) {
            enemyType = 'enemy1';
        } else if (randomValue > 30) {
            enemyType = 'enemy2';
        } else {
            enemyType = 'enemy3';
        }
    
        const enemy = new Enemy(enemyType);
        Enemy.aliveEnemies.push(enemy);
    }

}

export default Enemy;
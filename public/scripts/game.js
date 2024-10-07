import Player from '/classes/Player.js';
import Enemy from '/classes/Enemy.js';

Player.create();

function spawnEnemy() {
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

function collisionChecker() {
    const rectPlayer = Player.element.getBoundingClientRect();
    Enemy.aliveEnemies.forEach((enemy) => {
        const rectEnemy = enemy.element.getBoundingClientRect();
        if (
            rectPlayer.left < rectEnemy.right &&
            rectPlayer.right > rectEnemy.left &&
            rectPlayer.top < rectEnemy.bottom &&
            rectPlayer.bottom > rectEnemy.top
        ) {
            Player.takeDamage(enemy.life);
            enemy.remove()
        }
    });
}

function gameLoop() {
    const playerRect = Player.element.getBoundingClientRect();
    Enemy.aliveEnemies.forEach((enemy) => {
        enemy.moveToPlayer(playerRect);
    });
    collisionChecker();
    requestAnimationFrame(gameLoop);
}

setInterval(spawnEnemy, 1000);
requestAnimationFrame(gameLoop);

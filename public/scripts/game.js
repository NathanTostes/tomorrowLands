import Player from '/classes/Player.js';
import Enemy from '/classes/Enemy.js';

Player.create();

function spawnEnemy() {
    const enemy = new Enemy();
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
            Player.takeDamage();
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
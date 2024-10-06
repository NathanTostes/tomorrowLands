import Player from '/classes/Player.js';
import Enemy from '/classes/Enemy.js';

Player.create();

function spawnEnemy() {
    const enemy = new Enemy();
    Enemy.aliveEnemies.push(enemy);
}

function gameLoop() {
    const playerRect = Player.element.getBoundingClientRect();
    Enemy.aliveEnemies.forEach((enemy) => {
        enemy.moveToPlayer(playerRect);
    });
    requestAnimationFrame(gameLoop);
}

setInterval(spawnEnemy, 1000);
requestAnimationFrame(gameLoop);
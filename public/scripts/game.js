import Player from '/classes/Player.js';
import Enemy from '/classes/Enemy.js';
import Round from '/classes/Round.js'
import Construction from '/classes/Construction.js';

Player.create();

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

function freezeEnemies() {

    if (Enemy.frozedActivated == false) {        
        Enemy.frozedActivated = true;
        Enemy.aliveEnemies.forEach(enemy => {
            enemy.isFrozen = true; // paralisar cada inimigo
        });
        setTimeout(() => {
            Enemy.aliveEnemies.forEach(enemy => {
                enemy.isFrozen = false; // desparalizar cada inimigo
                
            });
            Enemy.frozedActivated= false;
        }, 5000); // 5s paralisado
    }
}



function gameLoop() {
    const playerRect = Player.element.getBoundingClientRect();
    Enemy.aliveEnemies.forEach((enemy) => {
        enemy.moveToPlayer(playerRect);
    });
    collisionChecker();
    Construction.checkCollisions();
    requestAnimationFrame(gameLoop);
}

await Enemy.loadEnemyTypes();
new Round()
requestAnimationFrame(gameLoop);

//verificar se o espaço está sendo pressionado

window.addEventListener('keydown', (event) => {
    if (event.code === 'Space') { 
        
        if (Player.freze > 0) {
            freezeEnemies()
            Player.freze --
            document.getElementById('playerFreeze-counter').textContent = `Gelo: ${Player.freze}`
        }        
    }
});
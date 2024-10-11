const gameContainer = document.getElementById('gameContainer');

class Player {
    static element = document.createElement('div');
    static life = 10;
    static gold = 0

    static create() {
        Player.element.id = 'player';
        gameContainer.appendChild(Player.element);
    }

    static takeDamage(damage) {
        Player.life -= damage;
        document.getElementById('playerLife-counter').textContent = `Vida: ${Player.life}`;
        if (Player.life <= 0) {
            Player.remove();
        }
    }

    static remove() {
        gameContainer.removeChild(Player.element);
        alert("Você foi derrotado!");
    }

    static goldCounter(enemyElement){
        if (enemyElement.id == 'enemy1') {
            Player.gold++
        } else if(enemyElement.id == 'enemy2' || enemyElement.id == 'enemy3'){
            Player.gold += 2
        }
        
        document.getElementById('gold-counter').textContent = `Ouro: ${Player.gold}`;
    }

}

export default Player;
const gameContainer = document.getElementById('gameContainer');

class Player {
    static element = document.createElement('div');
    static life = 10;

    static create() {
        Player.element.id = 'player';
        gameContainer.appendChild(Player.element);
    }

    static takeDamage() {
        Player.life -= 1;
        if (Player.life <= 0) {
            Player.remove();
        }
    }

    static remove() {
        gameContainer.removeChild(Player.element);
        alert("Você foi derrotado!");
    }
}

export default Player;
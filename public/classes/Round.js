import Enemy from '/classes/Enemy.js';

class Round {
    static ocurring = false;

    constructor(roundDificult) {
        Round.ocurring = true;
        this.roundEnemies = roundDificult * 10;
        this.remainRoundEnemies = this.roundEnemies;
        this.spawnRoundEnemies();
    }
    
    spawnRoundEnemies() { 
        for (let i = 0; i < this.roundEnemies; i++) {
            setTimeout(() => {
                Enemy.spawnEnemy();
            }, i * 1000)
        }
        Round.ocurring = false;
    }
}

export default Round;
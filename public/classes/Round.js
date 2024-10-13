import Enemy from '/classes/Enemy.js';

class Round {
    static occurring = false;
    static currentRound = 1;
    static spawnedEnemies = 0;
    static roundEnemies = 0;

    constructor() {
        Round.occurring = true;
        Round.spawnedEnemies = 0;
        Round.roundEnemies = Round.currentRound * 10;
        this.spawnRoundEnemies();
    }

    spawnRoundEnemies() {
        for (let i = 0; i < Round.roundEnemies; i++) {
            setTimeout(() => {
                Enemy.spawnEnemy();      
                Round.spawnedEnemies++;
            }, (i * 1000) / (Round.currentRound * 0.5));
        }
    }
        
    static checkAliveEnemies(){
        if (Enemy.aliveEnemies.length == 0 && Round.spawnedEnemies === Round.roundEnemies) {
            Round.occurring = false
            this.endRound()
        }
    }
    
    static endRound() {
        Round.occurring = false;
        window.alert(`Rodada ${Round.currentRound} finalizada`);
        setTimeout(() => this.nextRound(), 2000); // delay de 2 segundos pro próximo round. TROCAR PARA A FUNÇÃO DA LOJA
    }

    static nextRound() {
        Round.currentRound++;
        document.getElementById('round-counter').textContent = `Rodada: ${Round.currentRound}`;
        new Round();

    }

}

export default Round;

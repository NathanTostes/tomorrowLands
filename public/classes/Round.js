import Enemy from '/classes/Enemy.js';

class Round {
    static occurring = false;
    static currentRound = 1;
    static spawnedEnemies = 0
    static roundEnemies = 0
    constructor(roundDifficulty) {
        Round.occurring = true;
        Round.roundEnemies = roundDifficulty * 10;
        this.roundDifficulty = roundDifficulty
        this.spawnRoundEnemies();
    }

    spawnRoundEnemies() {
        for (let i = 0; i < Round.roundEnemies; i++) {
            setTimeout(() => {
                Enemy.spawnEnemy();      
                Round.spawnedEnemies ++
            }, (i * 1000) / (this.roundDifficulty * 0.5));
        }
    }
        
    static checkAliveEnemies(){
        if (Enemy.aliveEnemies.length == '0' && Round.spawnedEnemies === Round.roundEnemies) {
            console.log('é pra rodar o endRound()');
            Round.occurring = false
            this.endRound()
        }
    }
    
    static endRound() {
        Round.occurring = false;
        console.log(`rodada ${Round.currentRound} termino`);
        setTimeout(() => this.nextRound(), 2000); // delay de 2 segundos pro próximo round. TROCAR PARA A FUNÇÃO DA LOJA
    }

    static nextRound() {

        console.log('rodada iniciando');
        
            Round.currentRound++;
            console.log(`rodada ${Round.currentRound} começano`);
            new Round(Round.currentRound); //proxima rodada com dificuldade aumentada
            Round.spawnedEnemies = 0

    }
}

export default Round;

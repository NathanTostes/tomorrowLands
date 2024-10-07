import Enemy from '/classes/Enemy.js';

class Round {
    static occurring = false;
    static currentRound = 1;
    static spawnedEnemies = 0
    static aux = 0
    constructor(roundDifficulty) {
        Round.occurring = true;
        this.roundEnemies = roundDifficulty * 10;
        this.spawnRoundEnemies();
    }

    spawnRoundEnemies() {
        for (let i = 0; i < this.roundEnemies; i++) {
            setTimeout(() => {
                Enemy.spawnEnemy();
                Round.spawnedEnemies ++
                Round.aux = this.roundEnemies
                // console.log(Enemy.aliveEnemies.length);
            }, i * 1000);
        }
    }
        
    static checkAliveEnemies(){
        console.log(Round.spawnedEnemies); 
        // console.log(this.roundEnemies);        
        // console.log(Round.aux);
        
        // && Round.spawnedEnemies === Round.roundEnemies
        if (Enemy.aliveEnemies.length == '0' && Round.spawnedEnemies === Round.aux) {
            console.log('é pra rodar o endRound()');
            Round.occurring = false
            this.endRound()
        }
    }
    // static teste(){
    //     console.log('teste');
        
    // }
    
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

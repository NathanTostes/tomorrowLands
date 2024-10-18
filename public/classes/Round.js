import Enemy from '/classes/Enemy.js';
import Boss from "/classes/Boss.js";
import Shop from '/classes/Shop.js';


class Round {
    static occurring = false;
    static currentRound = 1;
    static spawnedEnemies = 0;
    static roundEnemies = 0;
    static roundDifficult = 0

    constructor() {
        Round.occurring = true;
        Round.spawnedEnemies = 0;
        Round.roundEnemies = Round.currentRound * 10;

        if (Round.currentRound % 5 == 0) {
            Round.roundDifficult += 1            
            //adiciona um de vida nos inimigos a cada 5 rounds 
        }

        this.spawnRoundEnemies();
    }
    
    spawnRoundEnemies() {
        for (let i = 0; i < Round.roundEnemies; i++) {
            setTimeout(() => {
                Enemy.spawnEnemy(Round.roundDifficult);      
                
                if (Round.spawnedEnemies == Round.roundEnemies/2) {
                    Boss.spawnBoss(Round.roundDifficult)               
                }
                
                Round.spawnedEnemies++;
            }, (i * 1000) / (Round.currentRound * 0.5));
        }
    }
        
    static checkAliveEnemies(){
        if (Enemy.aliveEnemies.length == 0 && Round.spawnedEnemies === Round.roundEnemies && Boss.aliveEnemies.length == 0) {
            Round.occurring = false
            this.endRound()
        }
    }
    
    static endRound() {
        Round.occurring = false;
        window.alert(`Rodada ${Round.currentRound} finalizada`);
        setTimeout(() => Shop.initShop(), 1000);
    }

    static nextRound() {
        Round.currentRound++;
        document.getElementById('round-counter').textContent = `Rodada: ${Round.currentRound}`;
        new Round();

    }

}

export default Round;

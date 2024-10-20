import Enemy from '/classes/Enemy.js';
import Boss from "/classes/Boss.js";
import Shop from '/classes/Shop.js';


class Round {
    static occurring = false;
    static currentRound = 1;
    static spawnedEnemies = 0;
    static roundEnemies = 0;
    static roundBosses = 0;

    constructor() {
        Round.occurring = true;
        Round.spawnedEnemies = 0;
        Round.roundEnemies = Round.currentRound * 10;
        Round.roundBosses = 1 + Math.floor(Round.currentRound * 0.1);

        this.spawnRoundEnemies();
    }
    
    spawnRoundEnemies() {
        const bossRate = Math.ceil(Round.roundEnemies / (Round.roundBosses));
        for (let i = 1; i <= Round.roundEnemies; i++) {
            setTimeout(() => {
                if(i % bossRate === 0) {
                    Boss.spawnBoss(Round.currentRound);
                }

                Enemy.spawnEnemy(Round.currentRound);   
                
                Round.spawnedEnemies++;
            }, (i * 1000) / (Round.currentRound * 0.5));
        }
    }
        
    static checkAliveEnemies(){
        if (Enemy.aliveEnemies.length == 0 && Round.spawnedEnemies === Round.roundEnemies && Boss.aliveBoss.length == 0) {
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

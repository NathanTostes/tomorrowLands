import Enemy from '/classes/Enemy.js';
import Shop from "/classes/Shop.js";

class Construction {
    static towers = [];

    constructor(x, y) {
        this.element = document.createElement('div');
        this.element.classList.add('tower');

        const towerSize = 50;
        this.element.style.width = `${towerSize}px`;
        this.element.style.height = `${towerSize}px`;

        this.element.style.left = `${x - towerSize / 2}px`;
        this.element.style.top = `${y - towerSize / 2}px`;

        this.collisions = 0;
        this.maxCollisions = 10;

        const gameContainer = document.getElementById('gameContainer');
        gameContainer.appendChild(this.element);
    }

    static placeTower() {
        const gameContainer = document.getElementById('gameContainer');

        const instruction = document.createElement('div');
        instruction.innerHTML = "Clique no campo de jogo para posicionar a torre.";
        instruction.id = "instruction";
        gameContainer.appendChild(instruction);

        const handlePlacement = (event) => {
            const rect = gameContainer.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            instruction.remove();

            Shop.initShop();

            Construction.towers.push(new Construction(x, y));
            
            gameContainer.removeEventListener('click', handlePlacement);
        };

        setTimeout(() => gameContainer.addEventListener('click', handlePlacement), 10);
    }

    static checkCollisions() {
        for (let i = Construction.towers.length - 1; i >= 0; i--) {
            const tower = Construction.towers[i];
            
            for (let j = Enemy.aliveEnemies.length - 1; j >= 0; j--) {
                const enemy = Enemy.aliveEnemies[j];
                
                const enemyRect = enemy.element.getBoundingClientRect();
                const towerRect = tower.element.getBoundingClientRect();
    
                if (tower.isColliding(towerRect, enemyRect)) {
                    tower.collisions++;
                    enemy.hit(1);
    
                    if (tower.collisions >= tower.maxCollisions) {
                        
                        Construction.towers.splice(i, 1);
                        tower.destroy();
                        break;  
                    }
                }
            }
        }
    }
    

    isColliding(rect1, rect2) {
        return !(rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom);
    }

    destroy() {
        this.element.remove();
    }
}

export default Construction;

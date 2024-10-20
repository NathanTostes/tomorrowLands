import Item from '/classes/Item.js';

export async function loadItemsFromJSON() {
    try {
        const response = await fetch('/storage/data/itens.json');
        const data = await response.json();

        const items = data.map(itemData => new Item(itemData.name, itemData.value, itemData.description, itemData.effect));
        return items;
    } catch (error) {
        console.error('Erro ao carregar os itens do JSON', error);
        return [];
    }
}

export async function loadEnemiesFromJSON() {
    try {
        const response = await fetch('/storage/data/enemies.json');
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Erro ao carregar os inimigos do JSON', error);
        return [];
    }
}

export async function loadBossesFromJSON() {
    try {
        const response = await fetch('/storage/data/bosses.json');
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Erro ao carregar os bosses do JSON', error);
        return [];
    }
}
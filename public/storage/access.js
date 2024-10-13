import Item from '/classes/Item.js';

export async function loadItemsFromJSON() {
    try {
        const response = await fetch('/data/storage/itens.json');
        const data = await response.json();

        const items = data.map(itemData => new Item(itemData.name, itemData.value, itemData.description, itemData.effect));
        return items;
    } catch (error) {
        console.error('Erro ao carregar os itens do JSON', error);
        return [];
    }
}

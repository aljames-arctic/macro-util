async function findResourceByLabel(actor, label) {
    for (const [key, resource] of Object.entries(actor.system.resources)) {
        if (resource && resource.label === label) {
            return key;
        }
    }
    return null;
}

async function createItem(actor, itemData, {forceRecreate = false} = {}) {   
        // Ensure actor has named spell
        const actorItem = actor.items.find(item => item.name === itemData.name);
        if (actorItem == null && !forceRecreate) await Item.create(itemData, { parent: actor });
}

export const actorApi = { findResourceByLabel, createItem };
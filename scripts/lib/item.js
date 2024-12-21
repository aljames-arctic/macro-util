async function synthetic(actor, itemData, updates = {}, mergeOptions, forceRecreate = false) {
    let item = itemData;
    foundry.utils.mergeObject(updates, { 'flags.world.synthetic': true });

    if (itemData.flags?.world?.synthetic && itemData.parent == actor && !forceRecreate) {
        /* nothing to do */
    } else {
        // Scraped from CPR 08/24/2024
        item = new CONFIG.Item.documentClass(itemData, { parent: actor });
        item.prepareData();
        item.prepareFinalAttributes();
        if (macroUtil.dependsOn.isActivated('dnd5e', '3.2'))
            item.applyActiveEffects();
    }

    return foundry.utils.mergeObject(item, updates, mergeOptions);
}

export const itemApi = {
    synthetic
};

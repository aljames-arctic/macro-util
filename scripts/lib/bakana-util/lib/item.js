async function synthetic(actor, itemData, updates = {}, mergeOptions, forceRecreate = false) {
    let item = itemData;
    foundry.utils.mergeObject(updates, { 'flags.world.syntheticItem': true });

    if (itemData.flags?.world?.syntheticItem && itemData.parent == actor && !forceRecreate) {
        /* nothing to do */
    } else if (macroUtil.dependsOn.isActivated({ id: 'chris-premades', min: '0.12.27' })) {
        item = await chrisPremades.utils.itemUtils.syntheticItem(itemData, actor);
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
    syntheticItem
};

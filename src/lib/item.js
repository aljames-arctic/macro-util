/**
 * Creates a synthetic item.
 * @param {object} actor The actor to create the item for.
 * @param {object} itemData The data for the item to create.
 * @param {object} [updates={}] The updates to apply to the item.
 * @param {object} [mergeOptions] The options for merging the updates.
 * @param {boolean} [forceRecreate=false] Whether to force recreation of the item.
 * @returns {Promise<object>} The created item.
 */
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
        if (macroUtil.dependsOn.isActivated('dnd5e', '3.2'))
            item.applyActiveEffects();
    }

    return foundry.utils.mergeObject(item, updates, mergeOptions);
}

export const itemApi = {
    synthetic
};

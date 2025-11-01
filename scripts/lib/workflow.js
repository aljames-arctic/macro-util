/**
 * Applies damage to a token from an item.
 * @param {object} itemData The data for the item to apply damage from.
 * @param {Array<Array<string>>} damageParts The parts of the damage to apply.
 * @param {object} token The token to apply damage to.
 * @returns {Promise<void>}
 */
async function itemDamageToken(itemData, damageParts, token) {
    let itemUpdate = foundry.utils.mergeObject(foundry.utils.duplicate(itemData), 
        {
            type: "feat",
            system: {
                actionType: "save",
                damage: { parts: damageParts },
                save: { dc: itemData.parent?.system?.attributes?.spelldc },
                components: { concentration: false },
                preparation: { mode: "innate", prepared: true },
                properties: [], // remove properties so we don't copy the concentration property over
            },
            effects: [], // no shield guardian animation
            flags: { "midi-qol": { effectActivation: false, onUseMacroName: "" } }
        });
    setProperty(itemUpdate.flags, "autoanimations.killAnim", true);

    const itemRoll = new CONFIG.Item.documentClass(itemUpdate, { parent: itemData.parent });
    const options = { showFullCard: false, createWorkflow: true, versatile: false, configureDialog: false, targetUuids: [token.document.uuid], workflowOptions: { 'autoRollDamage': 'always' } };
    await MidiQOL.completeItemUse(itemRoll, {}, options);
}

export const workflowApi = { itemDamageToken };
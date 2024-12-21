async function itemDamageToken(itemData, damageParts, token) {
    let itemUpdate = foundry.utils.mergeObject(duplicate(itemData), 
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
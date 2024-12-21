/* Item Setup:
 * 1. On Use Macro: After Checking Saves
 * 2. Effects:
 *    a. Aura
 *        - Details: Apply Effect to Actor
 *        - Duration: Macro Repeat set appropriately
 *        - Changes: itemMacro.macro
 *        - Auras: configured to hit appropriate targets
 *    b. Status Ailment (Configure as normal)
 *    c. Status Immunity
 *        - Details: Don't apply the effect
*/  

async function eachTurn() {
    if (actor.id == macroItem.parent.id) return;
    if (actor.items.find(i=>i.name == 'Never Target')) return;
    if (actor.effects.getName(`${macroItem.name} Immunity`)) return;
  
    const effectData = args[args.length - 1];
    const options = { targetUuids: [effectData.tokenUuid] }
    await MidiQOL.completeItemUse(macroItem, {}, options);
}

async function postSave() {
    let immunity = macroItem.effects.getName(`${macroItem.name} Immunity`);
    if (workflow.saves.size) await macroUtil.effect.apply(workflow.targets.first().actor, immunity);
}

if (typeof workflow !== "undefined") {
    if (workflow.macroPass == "postSave") await postSave();
} else {
    if (args[0] == 'each') await eachTurn();
}
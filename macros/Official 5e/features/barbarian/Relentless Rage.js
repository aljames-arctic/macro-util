// @bakanabaka

async function preItemRoll() {
    if (!workflow.item.callee) {
        ui.notifications.error(`${macroItem.name} can only be called from within a workflow.`);
        workflow.aborted = true;
        return false;
    }

    let configs = { consumeUsage: false };
    let options = {};
    macroUtil.item.preItemRoll.config(workflow, configs, options);

    // Jank -- use the uses to track the number of times it has occurred
    //    we do this because it automatically will reset on short rest this way
    // We are guarenteed this is already a synthetic item... so just modify it
    workflow.item.system.save.dc = 5 * macroItem.system.uses.value;
}

async function postSave() {
    await actor.setFlag('world', macroItem.name, {active : (workflow.saves.size > 0)});
}

async function isDamaged() {
    if (!actor.effects.find((ef) => ef.name == 'Rage')) return;
    if (workflow.damageItem.oldHP == 0) return;
    if (workflow.damageItem.oldHP != workflow.damageItem.hpDamage) return;

    const syntheticMacroItem = await macroUtil.item.syntheticItem(macroItem, actor, {callee : workflow.id});
    await MidiQOL.completeItemUse(syntheticMacroItem, {}, {});
    await macroItem.update({'system.uses.value': macroItem.system.uses.value + 1});

    let hasSaved = actor.getFlag('world', macroItem.name)?.active;
    await actor.unsetFlag('world', macroItem.name);
    if (hasSaved) workflow.damageItem.hpDamage -= 1;
}

const callArguments = {
    speaker     : speaker,
    actor       : actor,
    token       : token,
    character   : character,
    item        : item,
    args        : args,
    scope       : scope,
};
await macroUtil.runWorkflows(callArguments, {
    isDamaged   : isDamaged,
    preItemRoll : preItemRoll,
    postSave    : postSave,
});

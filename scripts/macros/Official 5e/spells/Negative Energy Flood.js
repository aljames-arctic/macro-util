// @bakanabaka

const macroItem = scope.macroItem;

async function preDamageRoll() {
    const targetToken = workflow.targets.first();
    const targetType = targetToken.actor.system.details.type.value?.toLowerCase();
    if (targetType == undefined || targetType == '')
        console.warn(`Token ${targetToken.id} has no creature type (eg 'undead, humanoid, ooze,...')`, targetToken);

    if (targetType != 'undead') return;

    const updates = {
        'system.actionType'     : 'heal',
        'system.damage.parts'   : [['5d12', 'temphp']],
        'system.save.ability'   : '',
        'system.save.dc'        : null,
        'system.save.scaling'   : 'flag',
    };

    workflow.item = await macroUtil.item.synthetic(actor, workflow.item, updates);
}

async function preDamageApplication() {
    if (!workflow.damageItem.oldHP) return;
    if (workflow.damageItem.oldHP != workflow.damageItem.hpDamage) return;

    const zombification = macroItem.effects.find((ef) => ef.name == 'Zombification');
    const target = canvas.tokens.get(workflow.damageItem.tokenId);
    await macroUtil.effect.create(target.actor, zombification);
}

async function offEffect() {
    let zombie = game.actors.getName('Zombie');
    if (!zombie)
        zombie = fromUuidSync(macroItem.system.summons?.profiles?.first().uuid);
    if (!zombie)
        ui.notifications.error("No zombie actor detected in either actor's tab or in configured summons");
    else await actor.transformInto(zombie, {}, { renderSheet: false });
}

try {
    if (typeof workflow == "undefined") {
        if (args[0] == 'off') await offEffect();
    } else {
        let states = { preDamageRoll, preDamageApplication };
        await states[workflow.macroPass]();
    }
} catch(e) { console.error(e); }

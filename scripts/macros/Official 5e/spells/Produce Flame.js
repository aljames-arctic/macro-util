// @bakanabaka

const macroItem = scope.macroItem;

async function preTargeting() {
    let produceFlameEffect = macroItem.effects.find((ef) => ef.name == 'Produce Flame');
    if (!workflow.targets.size) {
        const updates = { system: { target: { value: null, units: null, type: 'self' } } };
        workflow.item = await macroUtil.item.synthetic(actor, workflow.item, updates);
        produceFlameEffect.update({ disabled: !produceFlameEffect.disabled });
    }
}

async function preItemRoll() {
    if (!workflow.targets.size) {
        workflow.aborted = true;
    }
}

async function postAttackRoll() {
    let produceFlameEffect = macroItem.effects.find((ef) => ef.name == 'Produce Flame');
    if (produceFlameEffect) produceFlameEffect.update({ disabled: true });
}

try {
    let states = { preTargeting, preItemRoll, postAttackRoll };
    await states[workflow.macroPass]();
} catch(e) { console.error(e); }

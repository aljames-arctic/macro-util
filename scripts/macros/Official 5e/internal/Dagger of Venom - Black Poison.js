const macroItem = scope.macroItem;

async function postActiveEffects() {
    let dagger = actor.items.find((it) => it.name == 'Dagger of Venom');
    if (!dagger) return;
    let enableEffect = dagger.effects.find((ef) => ef.name == `${macroItem.name} Applied`);
    await enableEffect.update({ disabled: false });
}

try {
    let states = { postActiveEffects };
    await states[workflow.macroPass]();
} catch(e) { console.error(e); }
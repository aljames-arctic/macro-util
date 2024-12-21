function find(actorEntity, effect, {name=true, origin=true}) {
    return Array.from(actorEntity.allApplicableEffects()).find((ef) => ((ef.name == effect?.name) || !name) && ((ef.origin == effect?.origin) || !origin));
}

async function apply(entity, effectData) {
    let baseEffectData = { "flags.dae.dontApply" : false };
    foundry.utils.mergeObject(effectData, baseEffectData);
    await macroUtil.effect.create(entity, effectData);
}

async function create(entity, effectData, { concentrationItem, parentEntity, identifier, vae, interdependent, strictlyInterdependent, keepId, } = {}) {
    macroUtil.dependsOn.required({ id: 'chris-premades', min: '0.12.27' });
    let options = {
        concentrationItem,
        parentEntity,
        identifier,
        vae,
        interdependent,
        strictlyInterdependent,
        keepId,
    };
    await chrisPremades.utils.effectUtils.createEffect( entity, effectData, options );
}

async function remove(actorEntity, effect) {
    let isAllEffect = find(actorEntity, effect);
    if (isAllEffect) macroUtil.generic.remove(isAllEffect);
    else await macroUtil.generic.remove(effect);
}

export const effectsApi = { apply, create, find, remove };

function find(actorEntity, effect) {
    return Array.from(actorEntity.allApplicableEffects()).find((ef) => ef.name == effect?.name && ef.origin == effect?.origin);
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

export const effectsApi = { create, find, remove };

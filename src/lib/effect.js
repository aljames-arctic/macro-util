/**
 * Finds an effect on an actor.
 * @param {object} actorEntity The actor to search for the effect on.
 * @param {object} effect The effect to find.
 * @param {object} [options={}] The options for the search.
 * @param {boolean} [options.name=true] Whether to match by name.
 * @param {boolean} [options.origin=true] Whether to match by origin.
 * @returns {object} The found effect.
 */
function find(actorEntity, effect, {name=true, origin=true}) {
    return Array.from(actorEntity.allApplicableEffects()).find((ef) => ((ef.name == effect?.name) || !name) && ((ef.origin == effect?.origin) || !origin));
}

/**
 * Applies an effect to an entity.
 * @param {object} entity The entity to apply the effect to.
 * @param {object} effectData The data for the effect to apply.
 * @returns {Promise<void>}
 */
async function apply(entity, effectData) {
    let baseEffectData = { "flags.dae.dontApply" : false };
    foundry.utils.mergeObject(effectData, baseEffectData);
    await macroUtil.effect.create(entity, effectData);
}

/**
 * Creates an effect on an entity.
 * @param {object} entity The entity to create the effect on.
 * @param {object} effectData The data for the effect to create.
 * @param {object} [options={}] The options for creating the effect.
 * @param {object} [options.concentrationItem] The item that requires concentration.
 * @param {object} [options.parentEntity] The parent entity of the effect.
 * @param {string} [options.identifier] The identifier for the effect.
 * @param {boolean} [options.vae] Whether to use VAE.
 * @param {boolean} [options.interdependent] Whether the effect is interdependent.
 * @param {boolean} [options.strictlyInterdependent] Whether the effect is strictly interdependent.
 * @param {boolean} [options.keepId] Whether to keep the ID of the effect.
 * @returns {Promise<void>}
 */
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

/**
 * Removes an effect from an actor.
 * @param {object} actorEntity The actor to remove the effect from.
 * @param {object} effect The effect to remove.
 * @returns {Promise<void>}
 */
async function remove(actorEntity, effect) {
    let isAllEffect = find(actorEntity, effect);
    if (isAllEffect) macroUtil.generic.remove(isAllEffect);
    else await macroUtil.generic.remove(effect);
}

export const effectsApi = { apply, create, find, remove };

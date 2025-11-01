// Original animation author Xenophes
// Rewritten animation by @bakanabaka

/**
 * @param token The token this effect should occur on
 * @param effect The active effect this should be tied to if any, undefined if none
 * @param moteCount The number of motes to space equally around the token
 * @param id A unique name if for some reason more than one of this effect is run on this actor
 * @param file A JB2A animation to swirl around you
 * @param scale Scale factor for the animation
 */
function create(token, moteCount, { effect = undefined, id = 'Crown of Stars', file = 'jb2a.twinkling_stars.points07.white', scale = 0.5, radius = 0.5, } = {}) {
    if (!macroUtil.dependsOn.required({ id: 'sequencer' })) return;
    if (file.startsWith('jb2a.')) {
        if (!macroUtil.dependsOn.someRequired([{ id: 'jb2a_patreon' }, { id: 'JB2A_DnD5e' } ]))
            return;
    }

    // This helper creates and configures a single mote effect section.
    function createMote(idx) {
        const moteEffect = new Sequence()
            .effect()
            .file(file)
            .copySprite(token, { cacheLocation: true })
            .attachTo(token)
            .scale(scale)
            .fadeIn(300)
            .fadeOut(500)
            .aboveLighting()
            .persist()
            .name(`${id} - ${idx}`)
            .spriteOffset({ x: radius }, { gridUnits: true })
            .rotate((360 / moteCount) * idx);

        // Tie to an Active Effect if one is provided
        if (effect) {
            moteEffect.tieTo(effect);
        }

        // Add looping rotations
        moteEffect.loopProperty("sprite", "rotation", { from: 0, to: 360, duration: 5000, delay: 500 });
        moteEffect.loopProperty("spriteContainer", "rotation", { from: 0, to: 360, duration: 5000, delay: 0 });

        return moteEffect;
    }

    // Create a sequence and add each mote to it.
    const starsSequence = new Sequence();
    for (let i = 1; i <= moteCount; i++) {
        starsSequence.addSequence(createMote(i));
    }
    starsSequence.play();
}

async function remove(token, { id = 'Crown of Stars' } = {}, idx) {
    return Sequencer.EffectManager.endEffects({ name: `${id} - ${idx}`, objects: token });
}

async function destroy(token, { id = 'Crown of Stars' } = {}) {
    return Sequencer.EffectManager.endEffects({ name: `${id} - *`, objects: token });
}

export const crownOfStars = {
    create,
    remove,
    destroy,
};

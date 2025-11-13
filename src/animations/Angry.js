//Last Updated: 4/14/2023
//Author: EskieMoh#2969

async function create(token, { id = 'Angry', duration = 5000, file = undefined } = {}) {
    if (!macroUtil.dependsOn.required({ id: 'sequencer' })) return;
    if (!file) {
        if (!macroUtil.dependsOn.someRequired([{ id: 'eskie-effects' }, { id: 'eskie-effects-free' }])) return;
        const isPatreonUser = macroUtil.dependsOn.isActivated({ id: 'eskie-effects' });
        file = (isPatreonUser) ? `eskie.emote.angry.02` : `eskie-free.emote.angry.01`;
    }

    let effect = new Sequence()
        .effect()
        .name(id)
        .file(file)
        .atLocation(token)
        .scaleIn(0, 1000, {ease: "easeOutElastic"})
        .scaleOut(0, 1000, {ease: "easeOutExpo"})
        .spriteOffset({x:0.3*token.document.width, y:-0.3*token.document.width}, { gridUnits: true, local: true})
        .scaleToObject(0.65)
    effect = (duration > 0) ? effect.duration(duration) : effect.persist();    
    effect = effect.duration(duration)
        .attachTo(token, {bindAlpha:false })
        .loopProperty("alphaFilter", "alpha", { values: [...new Array(8).fill(1), ...new Array(8).fill(-1)], duration: 25, pingPong: false })
        .private()

        .effect()
        .name(id)
        .file(file)
        .atLocation(token)
        .scaleIn(0, 1000, {ease: "easeOutElastic"})
        .scaleOut(0, 1000, {ease: "easeOutExpo"})
        .spriteOffset({x:0.3*token.document.width, y:-0.3*token.document.width}, { gridUnits: true, local: true})
        .scaleToObject(0.65);
    effect = (duration > 0) ? effect.duration(duration) : effect.persist();
    return effect
        .attachTo(token, {bindAlpha: false})
        .loopProperty("alphaFilter", "alpha", { values: [...new Array(8).fill(-1), ...new Array(8).fill(1)], duration: 25, pingPong: false })
        .waitUntilFinished();
}

async function stop(token, { id = 'Angry' } = {}) {
    return Sequencer.EffectManager.endEffects({ name: id, object: token });
}

async function play(token, options = {}) {
    let seq = await create(token, options);
    await seq.play();
}

export const angry = {
    create,
    stop,
    play,
};

function create(token, { id = 'Drunk' } = {}) {
    // Last Updated: 4/14/2023
    // Author: EskieMoh#2969
    if (!macroUtil.dependsOn.required({ id: 'sequencer' })) return;

    const sequence = new Sequence();

    const swirlEffects = [
        { file: "https://i.imgur.com/TEcpsDG.png", delay: { min: 0, max: 500 }, offset: { x: -0.2, y: -0.6 }, xLoopTo: -0.02, xEase: "linear" },
        { file: "https://i.imgur.com/9htwrSu.png", delay: { min: 0, max: 600 }, offset: { x: -0.35, y: -0.5 }, xLoopTo: 0.05, xEase: "easeOutSine" },
        { file: "https://i.imgur.com/sbFfp0N.png", delay: { min: 750, max: 1000 }, offset: { x: -0.2, y: -0.5 }, xLoopTo: 0.05, xEase: "easeOutSine" },
        { file: "https://i.imgur.com/rqJmMPK.png", delay: { min: 500, max: 1200 }, offset: { x: -0.1, y: -0.3 }, xLoopTo: -0.05, xEase: "easeOutSine" },
    ];

    swirlEffects.forEach(effectData => {
        sequence.effect()
            .file(effectData.file)
            .name(`${id} ${token.id}`)
            .delay(effectData.delay.min, effectData.delay.max)
            .atLocation(token, { offset: { x: effectData.offset.x * token.document.width, y: effectData.offset.y * token.document.width }, gridUnits: true })
            .duration(7000)
            .scaleToObject(0.05)
            .zeroSpriteRotation()
            .loopProperty("sprite", "position.x", { from: 0, to: effectData.xLoopTo, duration: 2000, pingPong: true, gridUnits: true, ease: effectData.xEase })
            .loopProperty("sprite", "position.y", { from: 0.15, to: -0.15, duration: 6000, pingPong: false, gridUnits: true, ease: "easeOutSine" })
            .loopProperty("sprite", "width", { from: 0, to: 0.1, duration: 6000, pingPong: false, gridUnits: true, ease: "easeOutCubic" })
            .loopProperty("sprite", "height", { from: 0, to: 0.1, duration: 6000, pingPong: false, gridUnits: true, ease: "easeOutCubic" })
            .loopProperty("alphaFilter", "alpha", { values: [-1, 1, 1, 1, 1, -1], duration: 1000, pingPong: true, ease: "easeOutCubic" })
            .persist()
            .attachTo(token, { bindAlpha: false, bindRotation: false })
            .private();
    });

    return sequence
        .animation()
        .on(token)
        .opacity(0)

        .effect()
        .copySprite(token)
        .name(`${id} ${token.id}`)
        .atLocation(token)
        .loopProperty("sprite", "position.y", { values: [0, 20, 0, 20], duration: 2500, pingPong: true, ease: "easeInOutSine" })
        .loopProperty("sprite", "rotation", { from: -10, to: 10, duration: 2500, pingPong: true, ease: "easeInOutSine" })
        .persist()
        .attachTo(token, { bindAlpha: false })
        .waitUntilFinished()

        .thenDo(function () {
            Sequencer.EffectManager.endEffects({ name: `${id} ${token.id}`, object: token });
        })

        .animation()
        .on(token)
        .opacity(1);
}

async function play(token, options = {}) {
    let seq = await create(token, options);
    await seq.play();
}

async function destroy(token, { id = 'Drunk' } = {}) {
    return Sequencer.EffectManager.endEffects({ name: `${id} ${token.id}`, object: token });
}

export const drunk = {
    create,
    destroy,
    play,
};


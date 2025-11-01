function create(token, { id = 'Sleep' } = {}) {
    // Dependency checks for robustness
    if (!macroUtil.dependsOn.required({ id: 'sequencer' })) return;
    if (!macroUtil.dependsOn.someRequired([{ id: 'jb2a_patreon' }, { id: 'JB2A_DnD5e' }])) return;

    return new Sequence()

        .effect()
        .file("jb2a.sleep.symbol.dark_orangepurple")
        .name(`${id} ${token.id}`)
        .scaleIn(0, 500, {ease: "easeOutQuint"})
        .fadeOut(1000)
        .atLocation(token)
        .attachTo(token, {bindRotation: false, bindAlpha: false})
        .persist()
        .scaleToObject(2)

        .play();
}

async function destroy(token, { id = 'Sleep' } = {}) {
    return Sequencer.EffectManager.endEffects({ name: `${id} ${token.id}`, object: token });
}

export const sleep = {
    create,
    destroy,
};

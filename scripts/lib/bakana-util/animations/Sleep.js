function create(token, { id = 'Sleep' } = {}) {
    new Sequence()

        .effect()
        .file("jb2a.sleep.symbol.dark_orangepurple")
        .name(`${id} ${token.id}`)
        .scaleIn(0, 500, {ease: "easeOutQuint"})
        .fadeOut(1000)
        .atLocation(token)
        .attachTo(token, {followRotation: false, bindAlpha: false})
        .persist()
        .scaleToObject(2)

        .play();
}

async function destroy(token, { id = 'Sleep' }) {
    await Sequencer.EffectManager.endEffects({ name: `${id} ${token.id}`, object: token });
}

export const drunk = {
    create  : create,
    destroy : destroy,
};

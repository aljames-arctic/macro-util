async function create({ id = 'Wall of Fire' } = {}) {
    // Dependency checks for robustness
    macroUtil.dependsOn.required({ id: 'sequencer' });
    macroUtil.dependsOn.someRequired([{ id: 'jb2a_patreon' }, { id: 'JB2A_DnD5e' }]);

    const crosshairConfig = {
        size: 1,
        icon: 'icons/magic/fire/flame-burning-fist-orange.webp',
        label: 'Wall of Fire',
        tag: 'wall-of-fire-placement',
        drawIcon: false,
        drawOutline: false,
    };
    // Use Portal to get a ray for a more intuitive user experience
    const wallRay = await Portal.getRay();

    if (wallRay.cancelled) {
        // Portal.getRay() returns null on cancellation
        if (!wallRay) { return; }
    }

    // Create and play the animation, returning the sequence
    return new Sequence()
        .effect()
            .file("jb2a.energy_wall.01.25x05ft.01.complete.orange")
            .atLocation({ x: wallRay.x, y: wallRay.y })
            .name(id)
            .persist()
            .scale(1.5)
            .stretchTo({ x: wallRay.x + wallRay.dx, y: wallRay.y + wallRay.dy })
}

async function play(options = {}) {
    let seq = await create(options);
    await seq.play();
}

async function stop({ id = 'Wall of Fire' } = {}) {
    return Sequencer.EffectManager.endEffects({ name: id });
}

export const wallOfFire = {
    create,
    stop,
    play,
};
async function create({ id = 'Wall of Fire' } = {}) {
    // Dependency checks for robustness
    if (!macroUtil.dependsOn.required({ id: 'sequencer' })) return;
    if (!macroUtil.dependsOn.someRequired([{ id: 'jb2a_patreon' }, { id: 'JB2A_DnD5e' }])) return;

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
    if (!wallRay) {
        return;
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
        .play();
    }
}

async function destroy({ id = 'Wall of Fire' } = {}) {
    return Sequencer.EffectManager.endEffects({ name: id });
}

export const wallOfFire = {
    create,
    destroy,
};
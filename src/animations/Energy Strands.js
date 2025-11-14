function create(source, destination, {color = "blue"} = {}) {
    // Dependency checks for robustness
    macroUtil.dependsOn.required({ id: 'sequencer' });
    macroUtil.dependsOn.someRequired([{ id: 'jb2a_patreon' }, { id: 'JB2A_DnD5e' }]);

    const animation = macroUtil.animation.util.getColorPath("jb2a.energy_strands.range.multiple", color, "blue") + ".01";

    // Create and return the entire sequence so it can be played.
    return new Sequence()
        .effect()
            .attachTo(source)
            .stretchTo(destination)
            .file(animation);
}

async function play(source, destination, options = {}) {
    let seq = await create(source, destination, options);
    await seq.play();
}

export const energyStrands = {
    create,
    play,
};
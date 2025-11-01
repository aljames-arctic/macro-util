function create(source, destination, {color = "blue"} = {}) {
    // Dependency checks for robustness
    if (!macroUtil.dependsOn.required({ id: 'sequencer' })) return;
    if (!macroUtil.dependsOn.someRequired([{ id: 'jb2a_patreon' }, { id: 'JB2A_DnD5e' }])) return;

    const animation = macroUtil.animation.util.getColorPath("jb2a.energy_strands.range.multiple", color, "blue") + ".01";

    // Create and return the entire sequence so it can be played.
    const sequence = new Sequence()
        .effect()
            .attachTo(source)
            .stretchTo(destination)
            .file(animation)
        .play();
}

export const energyStrands = {
    create
};
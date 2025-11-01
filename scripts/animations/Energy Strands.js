function create(source, destination, {color = "blue"} = {}) {
    const animation = macroUtil.animation.util.getColorPath("jb2a.energy_strands.range.multiple", color, "blue") + ".01";

    let effect = new Sequence()
        .effect()
            .attachTo(source)
            .stretchTo(destination)
            .file(animation);

    return effect;
}

export const energyStrands = {
    create  : create
};
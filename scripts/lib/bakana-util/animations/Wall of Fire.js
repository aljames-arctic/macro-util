async function create({ id = 'Wall of Fire' } = {}) {
    let config = {
        size:1,
        icon: 'icons/commodities/materials/feather-orange.webp',
        label: 'start of wall',
        tag: 'firewall',
        t: 'circle',
        drawIcon: true,
        drawOutline: true,
        interval:-1,
        rememberControlled: true,
    }
    
    let start = await Sequencer.Crosshair.show(config);
    let template = await macroUtil.template.circle(start,60);
    config.label = 'end of wall'
    let end = await Sequencer.Crosshair.show(config);
    await template.delete();
        
    new Sequence()
        .effect()
        .file("jb2a.energy_wall.01.25x05ft.01.complete.orange")
        .atLocation(start)
        .name(id)
        .persist()
        .scale(1.5)
        .stretchTo(end)
        .play()
}

async function destroy({ id = 'Wall of Fire' }) {
    Sequencer.EffectManager.endEffects({ name: id });
}

export const wallOfFire = {
    create  : create,
    destroy : destroy,
};
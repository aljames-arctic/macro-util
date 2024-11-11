const isPatreon = macroUtil.dependsOn.isActivated({id:'jb2a_patreon'})
const scaleFactor = 1.5;
const summonCircle = `jb2a.magic_signs.circle.02.conjuration.intro.`.concat(isPatreon ? `yellow` : `yellow`);
const teleportIn = `jb2a.misty_step.01.`.concat(isPatreon ? `blue` : `blue`);
const teleportOut = `jb2a.misty_step.02.`.concat(isPatreon ? `blue` : `blue`);

async function circle(location) {
    await new Sequence()
        .effect()
        .file(summonCircle)
        .atLocation(location)
        .center()
        .scaleToObject(scaleFactor, { considerTokenScale: true })
        .belowTokens()
        .play()
}

async function enter(token) {
    await new Sequence()
        .effect()
        .file(teleportIn)
        .atLocation(token)
        .scaleToObject(scaleFactor, { considerTokenScale: true })
        .center()
        .fadeIn(500)
        .play()
}

async function leave(token) {
    await new Sequence()
        .effect()
        .file(teleportOut)
        .center()
        .atLocation(token)
        .scaleToObject(scaleFactor, { considerTokenScale: true })
        .fadeOut(1000)
        .play()
}

export const teleport = {
    circle,
    enter,
    leave,
};
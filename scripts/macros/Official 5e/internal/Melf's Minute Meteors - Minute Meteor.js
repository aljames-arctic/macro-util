// @bakanabaka

const macroItem = scope.macroItem;

const originName = `Melf's Minute Meteors`;
const effectUniqueName = `[${actor.id}] Melf's Minute Meteors`;

async function postDamageRoll() {
    const randomIndex = Math.floor(Math.random() * remainingStars.length);
    let randomStar = remainingStars[randomIndex];
    await macroUtil.animation.crownOfStars.remove(token, { id: effectUniqueName }, randomStar);

    remainingStars[randomIndex] = remainingStars[remainingStars.length - 1];
    remainingStars.pop();

    if (!remainingStars.length) {
        let crownEffect = actor.effects.find((ef) => ef.name == originName);
        await crownEffect.delete();
    }
}

let remainingStars = actor.getFlag('world', originName);
try {
    let states = { postDamageRoll };
    await states[workflow.macroPass]();
} catch(e) { console.error(e); }
await actor.setFlag('world', originName, remainingStars);

// @bakanabaka

const macroItem = scope.macroItem;
const effect = scope.effect;

const ANIMATION_FILE = 'jb2a.rolling_boulder.loop.01.rock.brown';

const spellLevel = args[args.length - 2];
const moteCount = 6;
const effectUniqueName = `[${actor.id}] Melf's Minute Meteors`;
const bonusItem = 'Minute Meteor';

async function onEffect() {
    async function wait(ms) { return new Promise(resolve => { setTimeout(resolve, ms); }); }
    await wait(500);
    let starMoteItem = actor.items.find((it) => it.name == bonusItem);
    await starMoteItem.update({'system.uses': { value: moteCount, max: moteCount, per: 'charges' }});
    ui.notifications.notify(`${bonusItem} has been created as a spell in your spellbook.`);

    // Don"t realistically need to wait on either of these
    actor.setFlag('world', `${macroItem.name}`, [...Array(moteCount).keys()].map((i) => i + 1));
    macroUtil.animation.crownOfStars.create(token, moteCount, {
        effect: effect,
        id: effectUniqueName,
        file: ANIMATION_FILE,
    });
}

async function offEffect() {
    macroUtil.animation.crownOfStars.destroy(token, { id: effectUniqueName });
    await actor.unsetFlag('world', `${macroItem.name}`);
}

const callArguments = {
    speaker     : speaker,
    actor       : actor,
    token       : token,
    character   : character,
    item        : item,
    args        : args,
    scope       : scope,
};
await macroUtil.runWorkflows(callArguments, {
    on  : onEffect,
    off : offEffect,
});

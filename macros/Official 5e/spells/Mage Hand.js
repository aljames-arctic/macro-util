const summonCount = 1;
let handColor = "random";
const playerToken = token;

async function distanceCheck(hookActor, hookUpdate, hookOptions) {
    let data = macroUtil.flag.get(actor, dataName) ?? { ids : [], hook : undefined };
    let tokenIds = data.ids;

    // Check if the summon moved further from the player
    const isSummon = tokenIds.find(id => id == hookUpdate._id);
    const isPlayer = (token.id == hookUpdate._id) ? token.id : undefined;
    let entity = canvas.tokens.get(hookUpdate._id);

    // Check if player character still exists
    if (!playerToken) return await deleteSummonedTokens();

    // Check if a summon moved further from the player
    if (isSummon) {
        const distance = MidiQOL.computeDistance(entity, playerToken, false);
        if (distance > 30) {
            deleteSummonedToken(isSummon);
            const index = tokenIds.indexOf(isSummon);
            tokenIds.splice(index, 1);
        }
    }
    // Check if the player moved further from a summon
    else if (isPlayer) {
        let entityArray = tokenIds;
        for (let id of tokenIds) {
            const summonToken = canvas.tokens.get(id);
            const distance = MidiQOL.computeDistance(entity, summonToken, false);
            if (distance > 30) {
                deleteSummonedToken(id);
                tokenIds.splice(i, 1);
            }
        }
        tokenIds = entityArray;
    }

    // Cleanup hook and flags or set new token id values
    if (tokenIds.length == 0 ) {
        let effect = actor.effects.find(effect => effect.name == macroItem.name);
        if (effect) effect.delete();    // calls 'off' : deleteSummonedTokens
    } else {
        data.ids = tokenIds;
        await macroUtil.flag.set(actor, dataName, data);
    }
}

async function createSummonTokens() {
    const options = { 
        origin : playerToken, 
        range  : item.system.range?.value ?? 30,
        img    : macroItem.img
    };

    if (handColor == "random"){
        const validColors = Sequencer.Database.getPathsUnder('jb2a.arcane_hand').map(color => color.charAt(0).toUpperCase() + color.slice(1));
        handColor = validColors[Math.floor(Math.random() * validColors.length)];
        if (handColor == "Rock") handColor = "Rock01"; // annoying corner case
    }
    const updates = {
        token : {
            "document.texture.src"  : `${macroUtil.module.getPath('jb2a')}/5th_Level/Arcane_Hand/ArcaneHand_Human_01_Idle_${handColor}_400x400.webm`,
            "document.actorLink"    : false,
        },
    };

    const callbacks = {
        pre: async (location, update) => {
            await Promise.all([
                macroUtil.animation.teleport.circle(location),
                macroUtil.generic.wait(2750)
            ]);
        },
        conc: async (location, update) => {
            // the animation breaks because summon returns before the summon is fully created
            // assume that it takes 50ms to create the summon on any reaonable  machine.
            await macroUtil.generic.wait(50);
        },
        post: async (template, response) => {
            const [[token], concReturn] = response;
            await macroUtil.animation.teleport.enter(token);
            if (!data.hook) {
                // Setup a single movement hook for all
                data.hook = Hooks.on("updateToken", distanceCheck);
                data.ids = [];
            }
            data.ids.push(token.id);
        }
    };

    for (let i=0; i<summonCount; ++i)
        await macroUtil.token.spawn(macroItem.name, updates, callbacks, options);
}

async function deleteSummonedToken(summonId) {
    let getSummoned = canvas.tokens.get(summonId);
    if (getSummoned) {
        await macroUtil.animation.teleport.leave(getSummoned);
        getSummoned.document.delete();
    }
}

async function deleteSummonedTokens() {
    for (let id of data.ids) await deleteSummonedToken(id);
    if (data.hook) Hooks.off("updateToken", data.hook);
    data.unset = true;
}

const dataName = `${macroItem.name} Spell Data`;
let data = macroUtil.flag.get(actor, dataName) ?? { ids : [], hook : undefined };

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
    on   : createSummonTokens,
    off  : deleteSummonedTokens,
});

if (data.unset) await macroUtil.flag.unset(actor, dataName);
else await macroUtil.flag.set(actor, dataName, data);
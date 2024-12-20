function getInfo() {
    return {
        active: game.combat?.active,
        round: game.combat?.round,
        turn: game.combat?.turn,
        id: game.combat?.id,
    };
}

function isSameTurn(combatInfo, {outsideCombat = "once"} = {}) {
    if (!macroUtil.combat.isSameRound(combatInfo, {outsideCombat})) return false;
    return combatInfo?.turn == game.combat?.turn;
}

function isSameRound(combatInfo, {outsideCombat = "once"} = {}) {
    if (outsideCombat == "never" && !game.combat) return false;
    if (!combatInfo) return true;
    if (!combatInfo.active && outsideCombat == "once") return false;
    if (combatInfo.id != game.combat.id) return false;
    return combatInfo.round == game.combat.round;
}

function onceEach(document, id, {frequency = "turn", restriction = "none", outsideCombat = "once"} = {}) {
    if (!['turn', 'round'].includes(frequency)) throw ('macroUtil.combat.oncePer config.frequency required to be one of {"turn", "round"}');
    if (!['none', 'own', 'other'].includes(restriction)) throw ('macroUtil.combat.oncePer config.restriction required to be one of {"none", "own", "other"}');
    if (!['once', 'never', 'always'].includes(outsideCombat)) throw('macroUtil.combat.oncePer config.outsideCombat required to be one of {"never", "once", "always"}');
    
    let info = document.getFlag('world', 'combat')?.[id]
    let check = (frequency == "turn") ? macroUtil.combat.isSameTurn : macroUtil.combat.isSameRound;
    return !check(info, {outsideCombat})
}

async function setInfo(document, id) {
    let info = document.getFlag('world', 'combat') ?? {};
    info[id] = macroUtil.combat.getInfo();
    await document.setFlag('world', 'combat', info);
}

export const combatApi = {
    getInfo,
    isSameTurn,
    isSameRound,
    onceEach,
    setInfo
};

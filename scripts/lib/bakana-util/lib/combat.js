/* Example usages of framework
 *
 *  * >>  An item, allowed to be used up to 1 times per turn (the most common use case)
 * if (!macroUtil.combat.isAllowed(actor, macroItem, macroItem.name)) return;
 *   < Additional checks made to make sure the item will be used >
 * await macroUtil.combat.updateInfo(macroItem, macroItem.name);
 *   < Do item stuff >
 * 
 * >>  An item, allowed to be used up to 3 times per round, but only on other token's turns
 * if (!macroUtil.combat.isAllowed(actor, macroItem, macroItem.name, {frequency = "round", restriction = "other", allowed = 3})) return;
 *   < Additional checks made to make sure the item will be used >
 * await macroUtil.combat.updateInfo(macroItem, macroItem.name);
 *   < Do item stuff >
 * 
 * >> An item, allowed to be used once per combat, but only on your own turn
 * * if (!macroUtil.combat.isAllowed(actor, macroItem, macroItem.name, {frequency = "combat", restriction = "own", allowed = 1})) return;
 *   < Additional checks made to make sure the item will be used >
 * await macroUtil.combat.updateInfo(macroItem, macroItem.name);
 *   < Do item stuff >
 * 
 * Note: outsideCombat behaves poorly with per combat, actions taken before combat start to not count against actions in combat.
 *       It is recommended if you are checking per-combat to set outsideCombat = false
 */

function _initInfo() {
    return {
        turn:   {id: game.combat?.turn,  count: 1},
        round:  {id: game.combat?.round, count: 1},
        combat: {id: game.combat?.id,    count: 1}
    };
}

function _update(combatInfo) {
    if (!combatInfo) return _initInfo();
    let updates = foundry.utils.duplicate(combatInfo);

    updates.turn.count++;
    updates.round.count++;
    updates.combat.count++;
    
    if (updates?.turn.id != game.combat?.turn) updates.turn.count--;
    if (updates?.round.id != game.combat?.round) updates.round.count--;
    if (updates?.combat.id != game.combat?.id) updates.combat.count--;
    return updates;
}

function _isSameTurn(combatInfo) {
    if (!macroUtil.combat.isSameRound(combatInfo)) return false;
    return combatInfo?.turn.id == game.combat?.turn;
}

function _isSameRound(combatInfo) {
    if (!macroUtil.combat.isSameCombat(combatInfo)) return false;
    return combatInfo?.round.id == game.combat.round;
}

function _isSameCombat(combatInfo) {
    return combatInfo?.combat.id == game.combat?.id;
}

function isAllowed(token, document, id, {frequency = "turn", restriction = "none", allowed = 1, outsideCombat = true} = {}) {
    // outside combat allowance
    let combatInfo = document.getFlag('world', 'combat') ?? {};
    let specificInfo = combatInfo[id];

    if (!outsideCombat) {
        // if we are not in active combat, warn user and return false
        if (!game.combat?.active) {
            ui.notifications.warn('This can not be used outside of combat.');
            return false;
        }
    }

    switch (restriction) {
        case "none":  break;  // no restriction, continue
        case "own":   if (game.combat?.current.tokenId == token.id) { break; } else { return false; };
        case "other": if (game.combat?.current.tokenId != token.id) { break; } else { return false; };
        default: throw(`Unknown restriction: ${restriction}`);
    }

    switch (frequency) {
        case "combat":  return !_isSameCombat(specificInfo) || (specificInfo.combat.count < allowed);
        case "round":   return !_isSameRound(specificInfo)  || (specificInfo.round.count  < allowed);
        case "turn":    return !_isSameTurn(specificInfo)   || (specificInfo.turn.count   < allowed);
        default: throw(`Unknown frequency: ${frequency}`);
    }
}

async function updateInfo(document, id) {
    let info = document.getFlag('world', 'combat') ?? {};
    info[id] = _update(info[id]);
    await document.setFlag('world', 'combat', info);
}

export const combatApi = {
    updateInfo,
    isAllowed
};

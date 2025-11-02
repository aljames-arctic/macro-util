/**
 * Checks if a user has permission to perform an action on an entity.
 * @param {object} entity The entity to check permissions for.
 * @param {string} userId The ID of the user to check permissions for.
 * @returns {boolean} Whether the user has permission.
 */
function hasPermission(actor, userId) {
    let user = game.users.get(userId);
    if (!user) return false;
    return actor.testUserPermission(user, 'OWNER');
}

/**
 * Removes an entity.
 * @param {object} entity The entity to remove.
 * @returns {Promise<void>}
 */
async function remove(entity) {
    let isPermitted = hasPermission(entity, game.user.id);
    if (isPermitted) return await entity.delete();

    if (entity instanceof ActiveEffect) {
        await MidiQOL.GM.removeEffects({actorUuid: entity.parent.uuid, effects: [entity.id]});
    }
}

/**
 * Waits for a specified number of milliseconds.
 * @param {number} ms The number of milliseconds to wait.
 * @returns {Promise<void>}
 */
async function wait(ms) { 
    return new Promise(resolve => { setTimeout(resolve, ms); });
}

export const genericApi = { 
    remove,
    hasPermission,
    wait
};

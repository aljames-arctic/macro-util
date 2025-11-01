async function findResourceByLabel(actor, label) {
    for (const [key, resource] of Object.entries(actor.system.resources)) {
        if (resource && resource.label === label) {
            return key;
        }
    }
    return null;
}

export const actorApi = { findResourceByLabel };
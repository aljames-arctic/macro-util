function get(actor, name) {
    return actor.getFlag('world', name);
}

async function set(actor, name, value) {
    await actor.setFlag('world', name, value)
}

async function unset(actor, name) {
    await actor.unsetFlag(`world`, name);
}

export const flagApi = { get, set, unset };
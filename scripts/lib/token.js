/**
 * Spawns a token.
 * @param {string} name The name of the token to spawn.
 * @param {object} [config=null] The configuration for the token.
 * @param {object} callbacks The callbacks for the spawn.
 * @param {object} [options={}] The options for the spawn.
 * @param {string} [options.img] The image for the token.
 * @param {object} [options.origin] The origin of the spawn.
 * @param {number} [options.range=60] The range of the spawn.
 * @returns {Promise<boolean>} Whether the spawn was successful.
 */
async function spawn(name, config=null, callbacks, options={img: undefined, origin : undefined, range : 60}) {
    macroUtil.dependsOn.required({id: "portal-lib"});

    let portal =  new Portal()
                        .addCreature(name, {updateData : config})
                        .color("#ff0000")
                        .texture(options.img);
                        
    if (options.origin &&  options.range) {
        portal =  portal.origin(options.origin)
                        .range(options.range);
    }
    const location = await portal.pick();
    if (!location) return undefined;
     
    if (callbacks.pre) await callbacks.pre(location, config);
    let summonCalls = [portal.setLocation(location).spawn()];
    if (callbacks.conc) summonCalls.push(callbacks.conc(location, config));
    const response = await Promise.all(summonCalls);
    if (callbacks.post) await callbacks.post(location, response);
    return true;
}

/**
 * Teleports a token.
 * @param {object} token The token to teleport.
 * @param {object} [options={}] The options for the teleport.
 * @param {string} [options.img="icons/svg/dice-target.svg"] The image for the teleport.
 * @param {number} [options.range=60] The range of the teleport.
 * @returns {Promise<void>}
 */
async function teleport(token, options={img : "icons/svg/dice-target.svg", range : 60}) {
    macroUtil.dependsOn.required({id: "portal-lib"});

    new Portal()
        .color("#ff0000")
        .texture(options.img)
        .origin(token)
        .range(options.range)
        .teleport()
}

export const tokenApi = { spawn, teleport };
/**
 * Checks if a module is active.
 * @param {string} name The name of the module.
 * @param {string} min The minimum version of the module.
 * @param {string} max The maximum version of the module.
 * @returns {boolean} Whether the module is active.
 */
function moduleIsActive(name, min, max) { 
    return macroUtil.dependsOn.isActivated({id: name, min: min, max:max}); 
}

/**
 * Gets the path for a module.
 * @param {string} id The ID of the module.
 * @returns {string} The path for the module.
 */
function getPath(id) {
    switch (id) {
        case 'jb2a':
            const moduleOption = moduleIsActive("jb2a_patreon") ? "jb2a_patreon" : "JB2A_DnD5e";
            return `modules/${moduleOption}/Library`;
        default:
            return '';
    }
}

export const moduleApi = { getPath };
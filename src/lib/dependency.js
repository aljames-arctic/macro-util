function moduleSetting(feature, defaultValue) {
    let setting = game.settings.get('macro-util', feature);
    if (!setting || setting == defaultValue) {
        ui.notifications.error(`${feature} not set! This needs to be set in the module settings.`);
        throw(`${feature} not set! This needs to be set in the module settings.`);
    }
}

/**
 * Checks if the versions are in ascending order.
 * @param {string} a The first version.
 * @param {string} b The second version.
 * @param {string} c The third version.
 * @returns {boolean} Whether the versions are in ascending order.
 * @private
 */
function _isAscending(a, b, c) {
    return  (!foundry.utils.isNewerVersion(a, b) && !foundry.utils.isNewerVersion(b, c));
}

/**
 * Checks if a dependency is activated.
 * @param {object} dependency The dependency to check.
 * @returns {[boolean, string]} Whether the dependency is activated and its version.
 * @private
 */
function _activated(dependency) {
    let isModule = game.modules.get(dependency.id);
    let entity = isModule ? game.modules.get(dependency.id) : globalThis[dependency.id];
    if (dependency.id == 'foundry') entity = game;

    if (!entity) return [false, undefined];
    if (!entity.active && isModule) return [false, undefined];
    if (!entity.version) ui.notifications.warn(`${entity} does not have a version field`);

    let [minimum, maximum] = [dependency.min, dependency.max];
    if (minimum == undefined) minimum = entity.version ?? '0.0.0';
    if (maximum == undefined) maximum = entity.version ?? '0.0.0';
    return [_isAscending(minimum, entity.version, maximum), entity?.version];
}

/**
 * Appends version information to a message.
 * @param {object} dependency The dependency to get version information from.
 * @param {string} version The current version of the dependency.
 * @returns {string} The message with version information appended.
 * @private
 */
function _versionMessageAppend(dependency, version) {
    let msg = '';
    if (dependency.min) msg += `\n\tMinimum version: ${dependency.min}`;
    if (dependency.max) msg += `\n\tMaximum version: ${dependency.max}`;
    msg += `\n\tCurrent version: ${version ?? 'NOT INSTALLED'}`;
    return msg;
}

/**
 * Checks if a dependency is activated and warns if it is not.
 * @param {object} dependency The dependency to check.
 * @param {string} warnMessage The message to warn with.
 * @returns {boolean} Whether the dependency is activated.
 */
function isActivated(dependency, warnMessage) {
    if (!dependency.id) return [false, undefined];
    let [isActivated, currentVersion] = _activated(dependency);
    if (!isActivated && warnMessage) {
    if (warnMessage.length) warnMessage += '\n';
        warnMessage += `Warning: ${dependency.id} is not between expected versions:`;
        warnMessage += _versionMessageAppend(dependency, currentVersion);
        console.warn(warnMessage);
    }
    return isActivated;
}

/**
 * Checks if a recommended dependency is activated.
 * @param {object} dependency The dependency to check.
 * @returns {boolean} Whether the dependency is activated.
 */
function hasRecommended(dependency) {
    return isActivated(dependency, 'Recommend installing the following:');
}

/**
 * Checks if at least one of a list of recommended dependencies is activated.
 * @param {Array<object>} dependencyList The list of dependencies to check.
 * @returns {boolean} Whether at least one dependency is activated.
 */
function hasSomeRecommended(dependencyList) {
    for (let dependency of dependencyList)
        if (isActivated(dependency)) return true;

    let warnMsg = 'Recommend installing one of the following:';
    for (let dependency of dependencyList) {
        warnMsg += `\nModule Id: ${dependency.id}`;
    }
    console.warn(warnMsg);
    return false;
}

/**
 * Checks if a required dependency is activated and throws an error if it is not.
 * @param {object} dependency The dependency to check.
 * @returns {boolean} Whether the dependency is activated.
 */
function required(dependency) {
    let [isActivated, currentVersion] = _activated(dependency);
    if (isActivated) return true;

    let errorMsg = `Requires ${dependency.id} to be installed and activated.`;
    errorMsg += _versionMessageAppend(dependency, currentVersion);
    throw errorMsg;
}

/**
 * Checks if at least one of a list of required dependencies is activated and throws an error if not.
 * @param {Array<object>} dependencyList The list of dependencies to check.
 * @returns {boolean} Whether at least one dependency is activated.
 */
function someRequired(dependencyList) {
    let errorMsg = `Requires at least one of the following to be installed and activated:\n`;

    for (let dependency of dependencyList) {
        let [isActivated, currentVersion] = _activated(dependency);
        if (isActivated) return true;

        errorMsg += `Module Id: ${dependency.id}`;
        errorMsg += _versionMessageAppend(dependency, currentVersion);
    }
    throw errorMsg;
}

export const dependencyApi = {
    isActivated,
    hasRecommended,
    hasSomeRecommended,
    required,
    someRequired,
    moduleSetting,
};

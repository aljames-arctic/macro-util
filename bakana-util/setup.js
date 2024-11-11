import { workflowApi } from './lib/runWorkflows.js';
import { animationApi } from './lib/animations.js';
import { combatApi } from './lib/combat.js';
import { dependencyApi } from './lib/dependency.js';
import { effectApi } from '../lib/effect.js';
import { flagApi } from '../lib/flag.js';
import { genericApi } from './lib/generic.js';
import { itemApi } from './lib/item.js';
import { moduleApi } from '../lib/module.js';
import { templateApi } from './lib/template.js';
import { tokenApi } from '../lib/token.js';

/**
 * Removes a previously exported function or variable and exports the specifed function or variable if the macro is active.
 *
 * @param {array} exportedIdentifierName the array of exported functions to be merged
 */
function setupApiCalls(exportedFunctions) {
  globalThis.macroUtil = foundry.utils.mergeObject(
    globalThis.macroUtil ?? {},
    exportedFunctions
  );
}

/**
 * Initializes the environment with macroUtil for macros
 */
let debugLevel = 0;
let version = '0.12.331.1';
export function setupBakanaMacros() {
  let priorVersion = globalThis.macroUtil?.version;
  if (foundry.utils.isNewerVersion(priorVersion, version)) return;  // only take newest changes
  // Initialize debugLevel variable
  globalThis.macroUtil = foundry.utils.mergeObject(globalThis.macroUtil ?? {}, {
    debugLevel,
    version,
  });

  setupApiCalls(workflowApi);
  setupApiCalls({ animation: animationApi });
  setupApiCalls({ combat: combatApi });
  setupApiCalls({ dependsOn: dependencyApi });
  setupApiCalls({ effect: effectApi });
  setupApiCalls({ flag: flagApi });
  setupApiCalls({ generic: genericApi });
  setupApiCalls({ item: itemApi });
  setupApiCalls({ module: moduleApi });
  setupApiCalls({ template: templateApi });
  setupApiCalls({ token: tokenApi });
}

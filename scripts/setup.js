import { animationApi } from './lib/animations.js';
import { combatApi } from './lib/combat.js';
import { dependencyApi } from './lib/dependency.js';
import { effectsApi } from './lib/effect.js';
import { genericApi } from './lib/generic.js';
import { itemApi } from './lib/item.js';
import { llmApi } from './lib/llm.js';
import { templateApi } from './lib/template.js';
import { workflowApi } from './lib/workflow.js';

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
const version = '1.0.0';

function setupMacroUtil() {
  if (globalThis.macroUtil?.version > version) return;  // only take newest changes
  // Initialize debugLevel variable
  globalThis.macroUtil = foundry.utils.mergeObject(globalThis.macroUtil ?? {}, {
    debugLevel,
    version,
  });

  setupApiCalls({ animation: animationApi });
  setupApiCalls({ combat: combatApi });
  setupApiCalls({ dependsOn: dependencyApi });
  setupApiCalls({ effect: effectsApi });
  setupApiCalls({ generic: genericApi });
  setupApiCalls({ item: itemApi });
  setupApiCalls({ llm: llmApi });
  setupApiCalls({ template: templateApi });
  setupApiCalls({ workflow: workflowApi })
}

Hooks.once('ready', async function() {
    setupMacroUtil();
});
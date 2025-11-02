import { actorApi } from './lib/actor.js';
import { animationApi } from './animations/animations.js';
import { combatApi } from './lib/combat.js';
import { dependencyApi } from './lib/dependency.js';
import { effectsApi } from './lib/effect.js';
import { genericApi } from './lib/generic.js';
import { itemApi } from './lib/item.js';
import { llmApi } from './lib/llm.js';
import { moduleApi } from './lib/modules.js'
import { sceneApi } from './lib/scene.js';
import { templateApi } from './lib/template.js';
import { tokenApi } from './lib/token.js';
import { workflowApi } from './lib/workflow.js';

// Import module settings
import './settings.js';



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

  setupApiCalls({ actor: actorApi });               // Updated to v13
  setupApiCalls({ animation: animationApi });       // Updated to v13
  setupApiCalls({ combat: combatApi });             // Updated to v13
  setupApiCalls({ dependsOn: dependencyApi });      // Updated to v13
  setupApiCalls({ effect: effectsApi });
  setupApiCalls({ generic: genericApi });
  setupApiCalls({ item: itemApi });
  setupApiCalls({ llm: llmApi });                   // Updated to v13
  setupApiCalls({ module: moduleApi });             // Updated to v13
  setupApiCalls({ scene: sceneApi });               // Updated to v13
  setupApiCalls({ template: templateApi });         // Updated to v13
  setupApiCalls({ token: tokenApi });
  setupApiCalls({ workflow: workflowApi });         // Updated to v13
}

Hooks.once('ready', async function() {
    setupMacroUtil();
});
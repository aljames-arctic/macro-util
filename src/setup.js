import { setupElwinsHelpers } from './src/elwin-helpers/setup.js'
import { setupMacroUtil } from './src/bakana-util/setup.js'

Hooks.once('ready', async function() {
    setupMacroUtil();
    setupElwinsHelpers();
})
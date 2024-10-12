import { setupElwinsHelpers } from './elwin-helpers/setup.js'
import { setupMacroUtil } from './bakana-util/setup.js'

Hooks.once('ready', async function() {
    setupMacroUtil();
    setupElwinsHelpers();
})
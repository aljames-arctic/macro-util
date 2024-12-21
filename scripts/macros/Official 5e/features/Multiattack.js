// Variables to customize Multiattack behavior
const clearTargets = false;
const autoUpload = true;    /* Note: storing in compendium works but throws known error messages - set to false and do it manually if this concerns you */ 
const itemCompendium = 'world.llm-modifications';    // Entry from: game.packs.filter(p => p.metadata.type == "Item").map(p => p.metadata.id)

async function queryOptions(options) {
    let selection = options.first().value;
    if (options.size > 1) {
        let input = { label: 'DND5E.Attack', name: 'skillSelected', options: { options: Array.from(options) } };
        selection = await chrisPremades.utils.dialogUtils.selectDialog(macroItem.name, macroItemDescription, input);
    }
    return selection;
}

async function parseOptionMap(optionMap) {
    function arrayWithoutItem(arr, item) {
      let index = arr.indexOf(item);
      return arr.slice(0, index).concat(arr.slice(index+1));
    }
    function getItem(selection) {
        let item = actor.items.find(i => i.name.toLowerCase() == selection);
        // Check with an added 's' ie Claw -> Claws (per Moto Moto)
        item = item ?? actor.items.find(i => i.name.toLowerCase() == selection + 's');
        // Check without " Attack" ie "Morningstar Attack" -> "Morningstar" (per Christopher)
        item = item ?? actor.items.find(i => i.name.toLowerCase() == selection.replace(" attack", "").trim());
        return item;
    }
    function actorHasItem(it) {
        let itemName = it.toLowerCase();
        let hasItem = getItem(itemName);
        let isCornerCase = ['melee attack', 'ranged attack'].includes(itemName);
        if (!hasItem && !isCornerCase)
            ui.notifications.warn(`Multiattack: Cannot find item ${it} on ${actor.name}.\nPlease update macroItem.flags.world['llm-parsed'], rename the attack, or add additional smarts to this script!`);

        return hasItem || isCornerCase;
    }
              
    let attacks = new Set(optionMap.flatMap(i => i).filter(i => actorHasItem(i)));
    let options = attacks.map(a => {return {value : a, label : a}}); // attacks CPR options format
    while (options.size) {
        let initialOption = await queryOptions(options);
        let selection = initialOption.toLowerCase();

        let attackItem = getItem(selection);
        if (!attackItem) {
          if (['melee attack', 'ranged attack'].includes(selection)) {
            let type = (selection == 'melee attack') ? 'mwak' : 'rwak';
            let attacks = new Set(actor.items.filter(i => i.system.actionType == type).map(i => i.name));
            let options = attacks.map(a => {return {value : a, label : a}}); // attacks CPR options format
            if (options.size) {
                selection = await queryOptions(options);
                attackItem = getItem(selection.toLowerCase());
            } else {
                ui.notification.warn(`Multiattack: Could not find a valid ${selection}.`);
                attackItem = undefined;
            }
          }
        }

        if (attackItem) await MidiQOL.completeItemUse(attackItem, {}, {ignoreUserTargets: clearTargets, workflowOptions : {targetConfirmation : "always"}});

        // Nonsense to reduce the optionMap by one attack, clearing any options that are invalid
        optionMap = optionMap
            .filter(i => i.includes(initialOption))        // remove attack flows without selected attack
            .map(i => arrayWithoutItem(i, initialOption)); // remove selected from remaining attack flows
        attacks = new Set(optionMap.flatMap(i => i).filter(i => actorHasItem(i)));
        options = attacks.map(a => {return {value : a, label : a}});
    }
}

async function getCompendiumDocuments(compendiumKey, fieldOptions, dataFilter) {
    let pack = game.packs.get(compendiumKey);
    if (!pack) {
        console.error(`${compendiumKey} does not exist.`)
        return undefined;
    }
    let packIndex = await pack.getIndex(fieldOptions);
    let matches = packIndex.filter(dataFilter);
    return matches.map(i => pack.getDocument(i._id));
}

async function getCompendiumItem(itemData) {
    let fieldOptions = {'fields': ['name', 'type', 'system.description']};
    let itemFilter = i => (
                (i.name == itemData.name) && 
                (i.system.description.value.includes(itemData.system.description.value)) &&
                (i.type == itemData.type)
            );

    let documents = await getCompendiumDocuments(itemCompendium, fieldOptions, itemFilter);
    return (documents.length) ? documents[0] : undefined;
}

async function getCompendiumItemFlags(itemData) {
    let item = await getCompendiumItem(itemData);
    return item?.flags?.world['llm-multiattack'];
}

async function createCompendiumItem(item) {
    /*
     *  Note: This function throws errors 
     *  However it seems to work, so I'm not debugging it
     *  -   Known Non-fatal Issue
     *  "Error: Error thrown in hooked function 'bound _onCreateItem' for hook 'createItem'. this._actor is null"
    */
    if (!itemCompendium) return;
    if (!autoUpload) return;
    let pack = game.packs.get(itemCompendium);

    if (!pack) console.error(`Pack ${itemCompendium} not found.`);
    else await pack.importDocument(item);
}

const macroItemDescription = macroItem.system.description.value.replace(/(<([^>]+)>)/gi, "");
try {
    let LLM = macroItem.getFlag('world', 'llm-multiattack');
    if (LLM.first) LLM = undefined;
    if (!LLM) {
        // Fallback #1 - Fetch from compendium
        LLM = await getCompendiumItemFlags(macroItem);
        if (LLM.first) LLM = undefined;
        // Fallback #2 - Call LLM
        let fromCompendium = !!(LLM);
        if (!LLM) LLM = await macroUtil.llm.prompt(macroUtil.llm.multiattack, macroItemDescription);
        if (!LLM) throw('Cannot read LLM! Not saving');
        await macroItem.setFlag('world', 'llm-multiattack', LLM);
        if (!fromCompendium) await createCompendiumItem(macroItem);
    }

    for (let optionMap of LLM) await parseOptionMap(optionMap);
} catch (e) { console.error(e); }
const wildshapeCompendium = 'world.robs-wild-shapes';

async function onEffect() {
    let options = {
        keepMental: true,
        keepFeats: true,
        keepItems: false,
        keepBio: true
    };

    let compendiumDocs = await chrisPremades.utils.compendiumUtils.getFilteredActorDocumentsFromCompendium(wildshapeCompendium);
    let polyMorphActor = await chrisPremades.utils.dialogUtils.selectDocumentDialog(macroItem.name, 'Select a Wildshape', compendiumDocs, {sortAlphabetical: true, sortCR: true, showCR: true});
    if (!polyMorphActor) throw(`${macroItem.name} - no actor selected.`);

    let [newToken] = await chrisPremades.utils.actorUtils.polymorph(actor, polyMorphActor, options, false);
    let newActor = newToken?.actor;
    if (!newActor) throw(`${macroItem.name} - no actor after polymorph.`);

    let hdStats = foundry.utils.duplicate(actor.system.attributes.hd);
    let hpStats = foundry.utils.duplicate(actor.system.attributes.hp);
    let acStats = foundry.utils.duplicate(newActor.system.attributes.ac);
    let typeStats = foundry.utils.duplicate(actor.system.details.type);
    let languages = foundry.utils.duplicate(actor.system.traits.languages);
    acStats.armor = Math.max(acStats.armor, 13 + actor.system.abilities.wis.mod);
    let wildshapeTempHp = (hpStats.temp < 3 * actor.classes.druid.system.levels);
    hpStats.temp = Math.max(hpStats.temp, 3 * actor.classes.druid.system.levels);
//    let abilities = foundry.utils.duplicate(newActor.system.abilties);
//    for (let [ability, value] of abilities) if (actor.system.abilities[ability].proficient) value.proficient = 1;
//    let skills = foundry.utils.duplicate(newActor.system.skills);
//    for (let [skill, value] of skills) if (actor.system.skills[skill].proficient) value.proficient = 1;

    await newActor.update({
        'system.attributes.hp' : hpStats,
        'system.attributes.hd' : hdStats,
        'system.attributes.ac' : acStats,
        'system.details.type' : typeStats,
        'system.traits.languages' : languages,
//        'system.abilities' : abilities,
//        'system.skills' : skills
    });

    console.error('setting wildshape temphp');
    await newActor.setFlag('world', 'wildshapeTempHp', wildshapeTempHp);
    console.error(newActor.getFlag('world', 'wildshapeTempHp'));
}

async function offEffect() {
    if (!actor.isPolymorphed) return;

    let hpStats = foundry.utils.duplicate(actor.system.attributes.hp);
    console.error(actor.getFlag('world', 'wildshapeTempHp'));
    if (actor.getFlag('world', 'wildshapeTempHp')) hpStats.temp = 0;

    originalActor = await actor.revertOriginalForm();
    await originalActor.effects.getName(macroItem.name).delete();
    await originalActor.update({
        'system.attributes.hp' : hpStats
    });
}

/* 
  * Wild Shape :
  *  X  Temporary Hit Points = DRUID LEVEL
  *     Statistics - Beast Shape
           But Retain :
             X  Creature Type
             X  Hit Points
             X  Hit Point Dice
             X  Non-Physical Ability Scores
                Class Features
             X  Languages
                Feats
             //  Skill and Saving Throw Proficiency
             //  Also gain proficiencies of Beast
   *    No Spell Casting 

   * Circle of the Moon
   *   X    AC = Math.max(BEAST AC, 13 + WisMod)
   *   X    Temp Hit Points = 3*DRUID LEVEL
   *        Cast certain spells
*/

try {
    if (args[0] == 'on') await onEffect();
    if (args[0] == 'off') await offEffect();
} catch(e) { console.error(e); }
// Stage types as of Midi-QOL 13.0.27
const WORKFLOW_STAGE = {
    preTargetting: 1,
    preItemRoll: 2,
    postNoAction: 3,
    preStart: 4,
    postStart: 5,
    preAoETargetConfirmation: 6,
    postAoETargetConfirmation: 7,
    preValidateRoll: 8,
    postValidateRoll: 9,
    prePreambleComplete: 10,
    postPreambleComplete: 11,
    preWaitForAttackRoll: 12,
    preAttackRoll: 13,
    preAttackRollConfig: 14,
    postWaitForAttackRoll: 15,
    preAttackRollcomplete: 16,
    preCheckHits: 17,
    postAttackRoll: 18,
    postAttackRollComplete: 19,
    preWaitForDamageRoll: 20,
    preDamageRoll: 21,
    preDamageRollConfig: 22,
    postWaitForDamageRoll: 23,
    preConfirmRoll: 24,
    postConfirmRoll: 25,
    preDamageRollStarted: 26,
    DamageBonus: 27,
    postDamageRollStarted: 28,
    postDamageRoll: 29,
    postDamageRollComplete: 30,
    preWaitForSaves: 31,
    preSave: 32,
    postSavesComplete: 33,
    preAllRollsComplete: 34,
    preDamageApplication: 35,
    postAllRollsComplete: 36,
    preApplyDynamicEffects: 37,
    preActiveEffects: 38,
    postApplyDynamicEffects: 39,
    preRollFinished: 40,
    postActiveEffects: 41,
    postRollFinished: 42,
    preCleanup: 43,
    postCleanup: 44,
    preCompleted: 45
};

function requiredAfter(tag, stage, workflow) {
    if (!(WORKFLOW_STAGE[workflow.macroPass] >= WORKFLOW_STAGE[stage]))
        throw new Error(`${tag} requires executing after the ${stage} stage but executed in the ${workflow.macroPass} stage`);
}

function isSlain(workflow) {
    requiredAfter('isSlain', 'preDamageApplication', workflow);
    const damageItem = workflow.damageItem;
    return (damageItem.newHP == 0) && (damageItem.oldHP !== 0);
}

function setSpellLevel(workflow, rolledActivity, level) {
    requiredAfter('setSpellLevel', 'prePreambleComplete', workflow);
    if (!rolledActivity.isSpell == "spell") return;
    const castData = workflow.castData;
    const itemData = workflow.item;

    castData.castLevel = level;
    itemData.level = workflow.castData.castLevel;
    castData.scaling = castData.castLevel - castData.baseLevel;    
    itemData.flags.dnd5e.scaling = castData.scaling;
}

export const workflowApi = { isSlain, setSpellLevel, requiredAfter };
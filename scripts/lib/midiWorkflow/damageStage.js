async function isSlain(workflow) {
    const damageItem = workflow.damageItem;
    return (damageItem.newHP == 0) && (damageItem.oldHp !== 0);
}

export const damageApi = { isSlain };
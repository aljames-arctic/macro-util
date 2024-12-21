// @bakanabaka

const macroItem = scope.macroItem;
const effect = scope.effect;

async function postPreambleComplete() {
    let targetSet = new Set();
    let templateSet = new Set();
    let config = {distance: 40, icon: {texture: macroItem.img}, label : {text: "Meteor Impact"}, location: {obj: token, showRange: true}, lockManualRotation: true };
    for (let idx = 0; idx < 4; ++idx) {
        let position = await Sequencer.Crosshair.show(config);
        if (!position) continue;
        let circle = await macroUtil.template.circle(position, 40);
        templateSet.add(circle);
        let targets = macroUtil.template.targets(circle);
        for (let target of targets) targetSet.add(target);
    }
    
    workflow.aborted = (templateSet.size == 0);
    for (let t of templateSet) t.delete();
    game.user.updateTokenTargets(targetSet.map(t => t.id));
}

const callArguments = {
    speaker     : speaker,
    actor       : actor,
    token       : token,
    character   : character,
    item        : item,
    args        : args,
    scope       : scope,
};
await macroUtil.runWorkflows(callArguments, {
    postPreambleComplete : postPreambleComplete
});
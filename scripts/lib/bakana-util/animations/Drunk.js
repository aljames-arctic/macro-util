function create(token, { id = 'Drunk' } = {}) {
//Last Updated: 4/14/2023
//Author: EskieMoh#2969

//Effect
    //Blush Target
    /*let config = {
        size:0.1,
        icon: 'icons/magic/symbols/star-rising-purple.webp',
        label: 'nose',
        tag: 'Spray',
        t: 'cone',
        drawIcon: false,
        drawOutline: true,
        interval:0,
        fillAlpha: 0.25,
        fillColor: '#FF0000',
        rememberControlled: true
    };
    let centerX =  token.x+(canvas.grid.size*token.document.height)/2
    let centerY =  token.y+(canvas.grid.size*token.document.height)/2
    
    let location = await warpgate.crosshairs.show(config);
    let locationX = (location.x/canvas.grid.size)-(centerX/canvas.grid.size);
    locationX = Math.round(locationX * 100) / 100;
    locationX = locationX.toFixed(2);
    
    let locationY = (location.y/canvas.grid.size)-(centerY/canvas.grid.size);
    locationY = Math.round(locationY * 100 ) / 100;
    locationY = locationY.toFixed(2);
    */
    
    //Tagger.addTags(token, "Drunken")
    
    new Sequence()
        .effect()
        .file("https://i.imgur.com/TEcpsDG.png")
        .name(`${id} ${token.id}`)
        .delay(0,500)
        .atLocation(token, {offset:{x:-0.2*token.document.width, y:-0.6*token.document.width}, gridUnits:true})
        .duration(7000)
        .scaleToObject(0.05)
        .zeroSpriteRotation()
        .loopProperty("sprite", "position.x", {  from:0, to: -0.02, duration: 2000, pingPong: true, gridUnits: true, ease:"linear" })
        .loopProperty("sprite", "position.y", { from:0.15, to: -0.15, duration: 6000, pingPong: false, gridUnits: true, ease:"easeOutSine" })
        .loopProperty("sprite", "width", {  from:0, to: 0.1, duration: 6000, pingPong: false, gridUnits: true, ease:"easeOutCubic" })
        .loopProperty("sprite", "height", { from:0, to: 0.1, duration: 6000, pingPong: false, gridUnits: true, ease:"easeOutCubic" })
        .loopProperty("alphaFilter", "alpha", { values: [-1, 1, 1, 1, 1, -1], duration: 1000, pingPong: true, ease:"easeOutCubic" })
        .persist()
        .attachTo(token, {bindAlpha: false, followRotation:false})
        .private()

        .effect()
        .file("https://i.imgur.com/9htwrSu.png")
        .name(`${id} ${token.id}`)
        .atLocation(token, {offset:{x:-0.35*token.document.width, y:-0.5*token.document.width}, gridUnits:true})
        .duration(7000)
        .delay(0, 600)
        .scaleToObject(0.05)
        .zeroSpriteRotation()
        .loopProperty("sprite", "position.x", {  from:0, to: 0.05, duration: 2000, pingPong: true, gridUnits: true, ease:"easeOutSine" })
        .loopProperty("sprite", "position.y", { from:0.15, to: -0.15, duration: 6000, pingPong: false, gridUnits: true, ease:"easeOutSine" })
        .loopProperty("sprite", "width", {  from:0, to: 0.1, duration: 6000, pingPong: false, gridUnits: true, ease:"easeOutCubic" })
        .loopProperty("sprite", "height", { from:0, to: 0.1, duration: 6000, pingPong: false, gridUnits: true, ease:"easeOutCubic" })
        .loopProperty("alphaFilter", "alpha", { values: [-1, 1, 1, 1, 1, -1], duration: 1000, pingPong: true, ease:"easeOutCubic" })
        .persist()
        .attachTo(token, {bindAlpha: false, followRotation:false})
        .private()

        .effect()
        .file("https://i.imgur.com/sbFfp0N.png")
        .name(`${id} ${token.id}`)
        .atLocation(token, {offset:{x:-0.2*token.document.width, y:-0.5*token.document.width}, gridUnits:true})
        .duration(7000)
        .delay(750, 1000)
        .scaleToObject(0.05)
        .zeroSpriteRotation()
        .loopProperty("sprite", "position.x", {  from:0, to: 0.05, duration: 2000, pingPong: true, gridUnits: true, ease:"easeOutSine" })
        .loopProperty("sprite", "position.y", { from:0.15, to: -0.15, duration: 6000, pingPong: false, gridUnits: true, ease:"easeOutSine" })
        .loopProperty("sprite", "width", {  from:0, to: 0.1, duration: 6000, pingPong: false, gridUnits: true, ease:"easeOutCubic" })
        .loopProperty("sprite", "height", { from:0, to: 0.1, duration: 6000, pingPong: false, gridUnits: true, ease:"easeOutCubic" })
        .loopProperty("alphaFilter", "alpha", { values: [-1, 1, 1, 1, 1, -1], duration: 1000, pingPong: true, ease:"easeOutCubic" })
        .persist()
        .attachTo(token, {bindAlpha: false, followRotation:false})
        .private()

        .effect()
        .file("https://i.imgur.com/rqJmMPK.png")
        .name(`${id} ${token.id}`)
        .atLocation(token, {offset:{x:-0.1*token.document.width, y:-0.3*token.document.width}, gridUnits:true})
        .duration(7000)
        .delay(500,1200)
        .scaleToObject(0.05)
        .zeroSpriteRotation()
        .loopProperty("sprite", "position.x", {  from:0, to: -0.05, duration: 2000, pingPong: true, gridUnits: true, ease:"easeOutSine" })
        .loopProperty("sprite", "position.y", { from:0.15, to: -0.15, duration: 6000, pingPong: false, gridUnits: true, ease:"easeOutSine" })
        .loopProperty("sprite", "width", {  from:0, to: 0.1, duration: 6000, pingPong: false, gridUnits: true, ease:"easeOutCubic" })
        .loopProperty("sprite", "height", { from:0, to: 0.1, duration: 6000, pingPong: false, gridUnits: true, ease:"easeOutCubic" })
        .loopProperty("alphaFilter", "alpha", { values: [-1, 1, 1, 1, 1, -1], duration: 1000, pingPong: true, ease:"easeOutCubic" })
        .persist()
        .attachTo(token, {bindAlpha: false, followRotation:false})
        .private()

        .animation()
        .on(token)
        .opacity(0)

        /*.effect()
        .file("https://i.imgur.com/HJ3pGDb.png")
        .name(`${id} ${token.id}`)
        .opacity(0.85)
        .scaleToObject(0.4)
        .loopProperty("spriteContainer", "position.x", {  from:-20, to: 20, duration: 2500, pingPong: true, ease:"easeInOutSine" })
        .loopProperty("sprite", "position.y", { values: [0, 20, 0, 20], duration: 2500, pingPong: true })
        .loopProperty("sprite", "rotation", { from: -10, to: 10, duration: 2500, pingPong: true,ease:"easeInOutSine" })
        .persist()
        .attachTo(token, {offset: {x:Number(locationX), y:Number(locationY)}, gridUnits: true, bindAlpha: false})
        .zIndex(0)
        .private()*/

        .effect()
        .from(token)
        .name(`${id} ${token.id}`)
        .atLocation(token)
        //.loopProperty("spriteContainer", "position.x", {  from:-20, to: 20, duration: 2500, pingPong: true, ease:"easeInOutSine" })
        .loopProperty("sprite", "position.y", { values: [0, 20, 0, 20], duration: 2500, pingPong: true })
        .loopProperty("sprite", "rotation", { from: -10, to: 10, duration: 2500, pingPong: true,ease:"easeInOutSine" })
        .persist()
        .attachTo(token, {bindAlpha: false})
        .waitUntilFinished()

        .thenDo(function(){
        //Tagger.removeTags(token, "Drunken")
        Sequencer.EffectManager.endEffects({ name: `${id} ${token.id}`, object: token });
        })

        .animation()
        .on(token)
        .opacity(1)

        .play();
}

async function destroy(token, { id = 'Drunk' }) {
    await Sequencer.EffectManager.endEffects({ name: `${id} ${token.id}`, object: token });
}

export const drunk = {
    create  : create,
    destroy : destroy,
};

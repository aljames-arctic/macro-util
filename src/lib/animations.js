import { crownOfStars } from '../animations/Crown of Stars.js';
import { energyStrands } from '../animations/Energy Strands.js';
//import { wallOfFire } from '../animations/Wall of Fire.js';
import { drunk } from '../animations/Drunk.js';

function getColorPath(path, color, dfault = "blue") {
    let pathColor = Sequencer.Database.getPathsUnder(path).find(i=>i.includes(color)) ?? dfault;
    return `${path}.${pathColor}`;
}

export const animationApi = {
    util : { getColorPath },
    crownOfStars,
    energyStrands,
//    wallOfFire,
    drunk,
};

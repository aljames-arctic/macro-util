import { crownOfStars } from './Crown of Stars.js';
import { energyStrands } from './Energy Strands.js';
import { wallOfFire } from './Wall of Fire.js';
import { drunk } from './Drunk.js';

function getColorPath(path, color, dfault = "blue") {
    let pathColor = Sequencer.Database.getPathsUnder(path).find(i=>i.includes(color)) ?? dfault;
    return `${path}.${pathColor}`;
}

export const animationApi = {
    util : { getColorPath },
    crownOfStars,
    energyStrands,
    wallOfFire,
    drunk,
};

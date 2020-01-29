module.exports = {
    rankChange(req, res, next) {
        const strength = res.locals.myObject[0].strength;
        const intelligence = res.locals.myObject[0].intelligence;
        const fluency = res.locals.myObject[0].fluency;
        const creativity = res.locals.myObject[0].creativity;
        let rank = {};

        let sum = strength + intelligence + fluency + creativity;
        let max = Math.max(strength, intelligence, fluency, creativity);
        if (sum < 40) {
            if (max === strength) {
                rank['name'] = 'Snail';
            } else if (max === intelligence) {
                rank['name'] = 'Koala';
            } else if (max === fluency) {
                rank['name'] = 'Gepard';
            } else if (max === creativity) {
                rank['name'] = 'Frog';
            } else {
                rank['name'] = 'Snail';
            }
        }
        if (sum >= 40 && sum < 90) {
            if (max === strength) {
                rank['name'] = 'Rhino';
            } else if (max === intelligence) {
                rank['name'] = 'Snake';
            } else if (max === fluency) {
                rank['name'] = 'Swan';
            } else if (max === creativity) {
                rank['name'] = 'Starfish';
            } else {
                rank['name'] = 'Ostrich';
            }
        }
        if (sum >= 90 && sum < 150) {
            if (max === strength) {
                rank['name'] = 'Piranha';
            } else if (max === intelligence) {
                rank['name'] = 'Whale';
            } else if (max === fluency) {
                rank['name'] = 'Archerfish';
            } else if (max === creativity) {
                rank['name'] = 'Deer';
            } else {
                rank['name'] = 'Turtle';
            }
        }
        if (sum >= 150 && sum < 230) {
            if (max === strength) {
                rank['name'] = 'Elephant';
            } else if (max === intelligence) {
                rank['name'] = 'Mouse';
            } else if (max === fluency) {
                rank['name'] = 'Eagle';
            } else if (max === creativity) {
                rank['name'] = 'Iguana';
            } else {
                rank['name'] = 'Moose';
            }
        }
        if (sum >= 230 && sum < 320) {
            if (max === strength) {
                rank['name'] = 'Gorilla';
            } else if (max === intelligence) {
                rank['name'] = 'Octopus';
            } else if (max === fluency) {
                rank['name'] = 'Crow';
            } else if (max === creativity) {
                rank['name'] = 'Lion';
            } else {
                rank['name'] = 'Hippo';
            }
        }
        if (sum >= 320) {
            if (max === strength) {
                rank['name'] = 'Orca';
            } else if (max === intelligence) {
                rank['name'] = 'Cat';
            } else if (max === fluency) {
                rank['name'] = 'Bee';
            } else if (max === creativity) {
                rank['name'] = 'Dog';
            } else {
                rank['name'] = 'Human';
            }
        }
        res.locals.myObject = rank;
        next();
    },
};

module.exports = {
    calc(req, res, next) {
        const stats = req.body.project.stats;
        const stats_list = res.locals.myObject;
        const new_stats_list = res.locals.newObject;
        let strength;
        let intelligence;
        let fluency;
        let creativity;

        for (let i = 0; i < stats.length; i++) {
            stats[i] = stats[i].toLowerCase();
            if (stats[i] === 'strength') {
                if (stats_list !== undefined) {
                    strength = stats_list[0].strength;
                } else {
                    strength = new_stats_list.strength;
                }
            }
            if (stats[i] === 'intelligence') {
                if (stats_list !== undefined) {
                    intelligence = stats_list[0].intelligence;
                } else {
                    intelligence = new_stats_list.intelligence;
                }
            }
            if (stats[i] === 'fluency') {
                if (stats_list !== undefined) {
                    fluency = stats_list[0].fluency;
                } else {
                    fluency = new_stats_list.fluency;
                }
            }
            if (stats[i] === 'creativity') {
                if (stats_list !== undefined) {
                    creativity = stats_list[0].creativity;
                } else {
                    creativity = new_stats_list.creativity;
                }
            }
        }
        const domStat = req.body.project.dominantStat.toLowerCase();
        let time = req.body.projectUsage.timeSpend;
        let statsWeight;
        let domStatWeight;
        let exit = {};

        switch (stats.length) {
            case 1:
                statsWeight = 0;
                domStatWeight = 0.1;
                break;
            case 2:
                statsWeight = 0.06;
                domStatWeight = 0.08;
                break;
            case 3:
                statsWeight = 0.04;
                domStatWeight = 0.06;
                break;
            case 4:
                statsWeight = 0.02;
                domStatWeight = 0.04;
                break;
        }

        let x = time;
        let y = stats.length;
        x = x / y;
        let sstats = x * statsWeight;
        let dstat = x * domStatWeight;

        if (domStat === 'strength') {
            strength = Math.round(strength + dstat);
            exit['strength'] = strength;
            if (intelligence !== undefined) {
                intelligence = Math.round(intelligence + sstats);
                exit['intelligence'] = intelligence;
            }
            if (fluency !== undefined) {
                fluency = Math.round(fluency + sstats);
                exit['fluency'] = fluency;
            }
            if (creativity !== undefined) {
                creativity = Math.round(creativity + sstats);
                exit['creativity'] = creativity;
            }
        }
        if (domStat === 'intelligence') {
            intelligence = Math.round(intelligence + dstat);
            exit['intelligence'] = intelligence;
            if (strength !== undefined) {
                strength = Math.round(strength + sstats);
                exit['strength'] = strength;
            }
            if (fluency !== undefined) {
                fluency = Math.round(fluency + sstats);
                exit['fluency'] = fluency;
            }
            if (creativity !== undefined) {
                creativity = Math.round(creativity + sstats);
                exit['creativity'] = creativity;
            }
        }
        if (domStat === 'fluency') {
            fluency = Math.round(fluency + dstat);
            if (intelligence !== undefined) {
                intelligence = Math.round(intelligence + sstats);
                exit['intelligence'] = intelligence;
            }
            if (strength !== undefined) {
                strength = Math.round(strength + sstats);
                exit['strength'] = strength;
            }
            if (creativity !== undefined) {
                creativity = Math.round(creativity + sstats);
                exit['creativity'] = creativity;
            }
        }
        if (domStat === 'creativity') {
            creativity = Math.round(creativity + dstat);
            if (intelligence !== undefined) {
                intelligence = Math.round(intelligence + sstats);
                exit['intelligence'] = intelligence;
            }
            if (fluency !== undefined) {
                fluency = Math.round(fluency + sstats);
                exit['fluency'] = fluency;
            }
            if (strength !== undefined) {
                strength = Math.round(strength + sstats);
                exit['strength'] = strength;
            }
        }
        res.locals.myObject = exit;
        next();
    },
};

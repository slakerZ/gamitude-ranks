const Stats = require('../../models/stats');
/*const text = {
    project: {
        stats: ['STRENGTH', 'INTELLIGENCE'],
        projectUsages: ['5e2493bf793d905e7bc15061', '5e24ad1438f7b81f6de75f53'],
        _id: '5e1a1b9a155f9263770a3d69',
        userId: 'someId2',
        name: 'Python',
        primaryMethod: '90/30',
        projectStatus: 'DONE',
        dominantStat: 'STRENGTH',
        __v: 0,
    },
    projectUsage: {
        _id: '5e24ad1438f7b81f6de75f53',
        projectId: '5e1a1b9a155f9263770a3d69',
        method: '90/30',
        timeSpend: 25,
        date: '2020-01-19T19:25:08.404Z',
        __v: 0,
    },
};

const tstats = {
    strength: 99,
    intelligence: 68,
    fluency: 36,
    creativity: 91,
    _id: '5e1c3fe52298215130e7c98b',
    __v: 0,
};
 */
module.exports = {
    calc(req, res, next) {
        const stats = req.body.project.stats;
        const stats_list = Stats(req.body);
        let strength;
        let intelligence;
        let fluency;
        let creativity;

        for (let i = 0; i < stats.length; i++) {
            stats[i] = stats[i].toLowerCase();
            if (stats[i] === 'strength') {
                strength = stats_list.strength;
            }
            if (stats[i] === 'intelligence') {
                intelligence = stats_list.intelligence;
            }
            if (stats[i] === 'fluency') {
                fluency = stats_list.fluency;
            }
            if (stats[i] === 'creativity') {
                creativity = stats_list.creativity;
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
        next();
    },
};

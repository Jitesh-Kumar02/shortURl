const { default: mongoose } = require("mongoose");

let service = {};

service.save = (item) => {
    return item.save();
};

service.findOne = (collection, search) => {
    return collection.findOne(search);
}

service.findOneAndUpdate = (collection, search, change) => {
    return collection.findOneAndUpdate(search, change);
}

// update runs and balls and wickets of bowler
service.updateBallsRunsWicketsBowler = async (findById, collection, teamNo, playerId, ballsBowled, runs, wickets) => {
    try {
        let newTeamNo = teamNo == "1" ? "2" : "1";
        await service.findOneAndUpdate(collection, {_id: new mongoose.Types.ObjectId(findById), [`team${newTeamNo}Players.playerId`]: playerId}, {$inc: {[`team${newTeamNo}Players.$.ballsBowled`]: ballsBowled, [`team${newTeamNo}Players.$.runsOnBowling`]: runs, [`team${newTeamNo}Players.$.playerWickets`]: wickets}});
    } catch(err) {
        return;
    }
}

// update runs and balls of batsman
service.updateBallsRunsBatsman = async (findById, collection, teamNo, playerId, ballsFaced, playerRuns) => {
    try {
        await service.findOneAndUpdate(collection, {_id: new mongoose.Types.ObjectId(findById), [`team${teamNo}Players.playerId`]: playerId}, {$inc: {[`team${teamNo}Players.$.ballsFaced`]: ballsFaced, [`team${teamNo}Players.$.playerRuns`]: playerRuns}});
    } catch(err) {
        return;
    }
}

// update wickets of batsman
service.updateWicketsBatsman = async (findById, collection, teamNo, playerId, flag) => {
    try {
        await service.findOneAndUpdate(collection, {_id: new mongoose.Types.ObjectId(findById), [`team${teamNo}Players.playerId`]: playerId}, {$set: {[`team${teamNo}Players.$.alreadyBatted`]: flag}});
    } catch(err) {
        return;
    }
}

// update wicket player id in teamFallOfWickets
service.updateTeamFallOfWickets = async (findById, collection, teamNo, wicketPlayerId, flag) => {
    try {
        if(flag) {
            await service.findOneAndUpdate(collection, {_id: new mongoose.Types.ObjectId(findById)}, {$push: {[`team${teamNo}FallOfWickets`]: wicketPlayerId}});
        } else {
            await service.findOneAndUpdate(collection, { _id: new mongoose.Types.ObjectId(findById) }, { $pull: { [`team${teamNo}FallOfWickets`]: wicketPlayerId}});
        }
    } catch(err) {
        return;
    }
}

// update team runs
service.updateTeamRuns = async (findById, collection, teamNo, runs, multiply) => {
    try {
        await service.findOneAndUpdate(collection, {_id: new mongoose.Types.ObjectId(findById) }, {$inc : {[`team${teamNo}Runs`] : runs*multiply}});
    } catch (err) {
        return;
    }
};

// update ball using ball id
service.updateBall = async (findById, collection, scoreCardTeam, ballId, change) => {
    try {
        await service.findOneAndUpdate(collection, {_id: new mongoose.Types.ObjectId(findById), [`${scoreCardTeam}._id`]: ballId }, change);
    } catch (err) {
        return;
    }
};

module.exports = service;

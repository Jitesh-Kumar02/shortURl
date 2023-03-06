let validate = {};
const Joi = require('joi');

const createNewPlayerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().required(),
    jerseyNo: Joi.number().required(),
    type: Joi.string().lowercase().required(),
    team: Joi.string().lowercase().required(),
});

const selectNextBatsmanSchema = Joi.object({
    matchId: Joi.string().required(),
    newBatsmanId1: Joi.string().required(),
    newBatsmanId2: Joi.string(),
});

const selectNextBowlerSchema = Joi.object({
    matchId: Joi.string().required(),
    newBowlerId: Joi.string().required(),
});

const updateScoreSchema = Joi.object().keys({
    matchId: Joi.string().required(),
    runs: Joi.number().integer().min(0).required(),
    byes: Joi.boolean(),
    validity: Joi.string().lowercase().valid("valid", "wide", "noball").required(),
    wicketType: Joi.string().lowercase().valid("lbw", "runout", "caught", "stumped", "bowled", "hitwicket"),
    wicketPlayerId: Joi.string(),
});

const addNewMatchSchema = Joi.object({
    team1Name: Joi.string().required(),
    team1Players: Joi.array().length(11).items(Joi.string()).required(),
    team2Name: Joi.string().required(),
    team2Players: Joi.array().length(11).items(Joi.string()).required(),
    date: Joi.date().required(),
    venue: Joi.string().required(),
    totalOvers: Joi.number().required(),
    firstBattingTeam: Joi.number().valid(1, 2).required(),
});

const signupUserSchema = Joi.object({
    phoneNo: Joi.number().integer().min(10 ** 9).max(10 ** 10 - 1).required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
});

const loginUserSchema = Joi.object({
    phoneNo: Joi.number().integer().min(10 ** 9).max(10 ** 10 - 1).required(),
    password: Joi.string().min(8).required(),
});

const validateAll = (req, res, next, schema) => {
    try {
        const result = schema.validate(req.body);
        if(result.error) {
            return res.status(400).send({success: false, error: result.error.message || "Invalid data"});
        } else {
            req.body = result.value;
        }
    } catch(err) {
        return res.status(500).send({success: false, error: err.message || "internal server error"});
    }
    next();
}

validate.validateSelectNextBatsman = (req, res, next) => {
    validateAll(req, res, next, selectNextBatsmanSchema);
}

validate.validateSelectNextBowler = (req, res, next) => {
    validateAll(req, res, next, selectNextBowlerSchema);
}

validate.validateUpdateScore = (req, res, next) => {
    validateAll(req, res, next, updateScoreSchema);
}

validate.validateAddNewMatch = (req, res, next) => {
    validateAll(req, res, next, addNewMatchSchema);
}

validate.validateCreateNewPlayer = (req, res, next) => {
    validateAll(req, res, next, createNewPlayerSchema);
}

validate.validateSignupUser = (req, res, next) => {
    validateAll(req, res, next, signupUserSchema);
}

validate.validateLoginUser = (req, res, next) => {
    validateAll(req, res, next, loginUserSchema);
}

module.exports = validate;

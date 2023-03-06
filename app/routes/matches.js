const express = require("express");
const router = express.Router();

const matchesLogic = require("../controllers/matches");
const validate = require("../validator/validate");
const authMatch = require("../auth/authMatches");
const authUpdateScore = require("../auth/authUpdateScore");

// fetch all matches
router.get("/fetch", matchesLogic.fetchMatches);

// add new macth
router.post("/add", validate.validateAddNewMatch, authUpdateScore, matchesLogic.addNewMatch);

// Select next batsman
router.patch("/selectNextBatsman", validate.validateSelectNextBatsman, authUpdateScore, authMatch, matchesLogic.selectNextBatsman);

// Select next bowler
router.patch("/selectNextBowler", validate.validateSelectNextBowler, authUpdateScore, authMatch, matchesLogic.selectNextBowler);

// Update score
router.put("/updateScore", validate.validateUpdateScore, authUpdateScore, authMatch, matchesLogic.updateScore);

// Undo and Update score
router.put("/undoUpdateScore", validate.validateUpdateScore, authUpdateScore, authMatch, matchesLogic.undoUpdateScore);

module.exports = router;

const express = require("express");
const router = express.Router();

const matchesLogic = require("../controllers/matches");
const validate = require("../validator/validate");
const authMatch = require("../auth/authMatches");

// add new macth
router.post("/add", validate.validateAddNewMatch, matchesLogic.addNewMatch);

// fetch all matches
router.get("/fetch", matchesLogic.fetchMatches);

// Select next batsman
router.patch("/selectNextBatsman", validate.validateSelectNextBatsman, authMatch, matchesLogic.selectNextBatsman);

// Select next bowler
router.patch("/selectNextBowler", validate.validateSelectNextBowler, authMatch, matchesLogic.selectNextBowler);

// Update score
router.put("/updateScore", validate.validateUpdateScore, authMatch, matchesLogic.updateScore);

// Undo and Update score
router.put("/undoUpdateScore", validate.validateUpdateScore, authMatch, matchesLogic.undoUpdateScore);

module.exports = router;

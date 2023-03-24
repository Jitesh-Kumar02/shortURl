let urlLogic = {};

const { default: mongoose } = require("mongoose");
const urlCollection = require("../models/url");
const service = require("../service/service");

// create new url
urlLogic.createNewUrl = async (req, res) => {
    try {
        let obj = urlCollection({longURL: req.body.url});
        await service.save(obj);

        return res.status(201).send({success: true, message: "New URL created successfully", shortURL: obj._id});
    } catch(err) {
        return res.status(500).send({success: false, error: err.message || "Internal server error"});
    }
};

// redirect to url
urlLogic.redirect = async (req, res) => {
    try {
        let url = await urlCollection.aggregate([
            {
                $match: {_id: new mongoose.Types.ObjectId(req.body.url)}
            }
        ]);
        if(url.length) {
            url = url[0].longURL;
            res.redirect(url);
        } else return res.status(400).send({success: false, error: "URL not found"});
    } catch(err) {
        return res.status(500).send({success: false, error: err.message || "Internal server error"});
    }
}

module.exports = urlLogic;

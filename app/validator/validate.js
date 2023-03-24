let validate = {};
const Joi = require('joi');

const urlSchema = Joi.object({
    url: Joi.string().uri().required(),
});

const validateAll = (req, res, next, schema, payload) => {
    try {
        const result = schema.validate(payload);
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

validate.url = (req, res, next) => {
    validateAll(req, res, next, urlSchema, req.body);
}

module.exports = validate;

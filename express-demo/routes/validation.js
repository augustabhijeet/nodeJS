const Joi = require('joi');

//Joi validation schema
const registrationValidation = (data) => {
    const schema = {
        name : Joi.string().min(3).required(),
        email : Joi.string().min(6).required().email(),
        password : Joi.string().min(6).required()
    };
    const {error} = Joi.validate(data, schema);

 //const result = Joi.validate(req.body, schema);
 // object destructuring of above {error} is equivalent to result.error
    if(error) return error.details[0].message;

    return 'NO_ERROR';
     
}

const loginValidation = (data) => {
    const schema = {
        email : Joi.string().min(6).required().email(),
        password : Joi.string().min(6).required()
    };
    const {error} = Joi.validate(data, schema);
 
    if(error) return error.details[0].message;

    return 'NO_ERROR';
     
}

module.exports.registrationValidation = registrationValidation;

module.exports.loginValidation = loginValidation;

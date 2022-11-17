const Joi = require('joi')

const inquiryValidate ={
    body:Joi.object().keys({
            name: Joi.string().required(),
            email:Joi.string().email().required(),
            type:Joi.string().required(),
            mobile:Joi.required(),
            details:Joi.string().required(),
            country:Joi.string(),
    })
} 


const hireDevelopValidate ={
    body:Joi.object().keys({
                name: Joi.string().required(),
                email:Joi.string().email().required(),
                resource:Joi.string().required(),
                details:Joi.required(),
                contact:Joi.string().required(),
                country:Joi.string(),
                model:Joi.required(),
    })
} 

const modalContactValidate ={
    body:Joi.object().keys({
                email:Joi.string().email().required(),
                mobile:Joi.required(),
                country:Joi.string(),
                casestudy:Joi.required(),
            })
} 

module.exports = {
    inquiryValidate,
    hireDevelopValidate,
    modalContactValidate
}
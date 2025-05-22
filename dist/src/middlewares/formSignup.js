"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var signupSchema = joi_1.default.object({
    first_name: joi_1.default.string().min(3).max(50).required().messages({
        "string.empty": "Prénom : le champ est obligatoire",
        "string.min": "Prénom : minumum 3 characters",
        "string.max": "Prénom : maximum 50 characters",
    }),
    last_name: joi_1.default.string().min(3).max(50).required().messages({
        "string.empty": "Nom : le champ est obligatoire",
        "string.min": "Nom : minumum 3 characters",
        "string.max": "Nom : maximum 50 characters",
    }),
    email: joi_1.default.string().email().required().messages({
        "string.empty": "email : le champ est obligatoire",
        "string.email": "email incorrect",
    }),
    password: joi_1.default.string().min(8).max(50).required().messages({
        "string.empty": "Mot de passe : le champ est obligatoire",
        "string.min": "Le mot de passe doit contenir minumum 8 characters",
        "string.max": "le mot de passe peut contenir maximum 50 characters",
    }),
    confirmPassword: joi_1.default.string().valid(joi_1.default.ref("password")).required().messages({
        "any.only": "Les mots de passe ne correspondent pas",
        "string.empty": "Le champ est obligatoire",
    }),
});
var validate = function (req, res, next) {
    var error = signupSchema.validate(req.body).error;
    if (error) {
        res.json({ error: error.details[0].message });
    }
    else {
        next();
    }
};
exports.default = { validate: validate };

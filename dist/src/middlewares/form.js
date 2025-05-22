"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var movieSchema = joi_1.default.object({
    title: joi_1.default.string()
        .min(2)
        .max(50)
        .messages({
        "string.min": "Le titre doit contenir au moins 2 caractère",
        "string.max": "Le titre doit contenir au maximum 50 caractères",
    })
        .required(),
    release_year: joi_1.default.number().min(1900).required().messages({
        "number.min": "l'année de sortie est invalide",
    }),
    synopsis: joi_1.default.string().min(10).max(500).required().messages({
        "string.min": "le synopsis doit contenir au moins 10 caractères",
        "string.max": "le synopsis doit contenir au maximum 500 caractères",
    }),
    duration: joi_1.default.number().integer().min(6).max(6).required().messages({
        "number.max": "la durée doit être au format 00:00:00",
        "number.min": "la durée doit être au format 00:00:00",
    }),
    production: joi_1.default.string().min(5).max(100).required().messages({
        "string.min": "la production doit contenir au moins 5 caractères",
        "string.max": "la production doit contenir au maximum 50 caractères",
    }),
    casting: joi_1.default.string().min(5).max(100).required().messages({
        "string.min": "le casting doit contenir au moins 5 caractères",
        "string.max": "le casting doit contenir au maximum 50 caractères",
    }),
    poster: joi_1.default.string().min(10).max(255).required().messages({
        "string.base": "le poster doit être une URL",
        "string.min": "le poster doit contenir au minimun 10 caractères",
        "string.max": "le poster doit contenir au maximum 255 caractères",
    }),
    trailer: joi_1.default.string().min(10).max(255).required().messages({
        "string.base": "le trailer doit être un lien vers une vidéo",
        "string.min": "le trailer doit contenir au minimun 10 caractères",
        "string.max": "le trailer doit contenir au maximum 255 caractères",
    }),
    landscape_image: joi_1.default.string().min(10).max(255).required().messages({
        "string.base": "l'image de fond doit être au format paysage en URL",
        "string.min": "l'URL de l'image de fond doit contenir au minimun 10 caractères",
        "string.max": "l'URL de l'image de fond doit contenir au maximum 255 caractères",
    }),
});
var validate = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error;
    return __generator(this, function (_a) {
        error = movieSchema.validate(req.body).error;
        if (error) {
            res.json({ error: error.details[0].message });
        }
        else {
            next();
        }
        return [2 /*return*/];
    });
}); };
exports.default = { validate: validate };

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
var argon2_1 = __importDefault(require("argon2"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var userRepository_1 = __importDefault(require("../modules/user/userRepository"));
var hashingOptions = {
    type: argon2_1.default.argon2id,
    memoryCost: 19 * Math.pow(2, 10),
    timeCost: 2,
    parallelism: 1,
};
var hashPassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var password, hashedPassword, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                password = req.body.password;
                return [4 /*yield*/, argon2_1.default.hash(password, hashingOptions)];
            case 1:
                hashedPassword = _a.sent();
                req.body.hashed_password = hashedPassword;
                req.body.password = undefined;
                next();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, verified, payload, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, userRepository_1.default.readByEmailWithPassword(email)];
            case 1:
                user = _b.sent();
                console.info(user);
                if (!user) {
                    res.sendStatus(422);
                }
                return [4 /*yield*/, argon2_1.default.verify(user.hashed_password, password)];
            case 2:
                verified = _b.sent();
                if (!!verified) return [3 /*break*/, 3];
                res.sendStatus(422);
                return [3 /*break*/, 5];
            case 3:
                payload = {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                };
                if (!process.env.APP_SECRET) {
                    throw new Error("Vous n'avez pas configuré votre APP SECRET dans le .env");
                }
                return [4 /*yield*/, jsonwebtoken_1.default.sign(payload, process.env.APP_SECRET, {
                        expiresIn: "1d",
                    })];
            case 4:
                token = _b.sent();
                res.status(200).cookie("auth", token).json({
                    message: "Connexion réussie",
                    role: payload.role,
                    email: payload.email,
                    subscription: user.subscription,
                });
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_2 = _b.sent();
                next(error_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var verify = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var auth, resultPayLoad;
    return __generator(this, function (_a) {
        if (!process.env.APP_SECRET) {
            throw new Error("Vous n'avez pas configuré votre APP_SECRET dans le .env");
        }
        try {
            auth = req.cookies.auth;
            if (!auth) {
                res.sendStatus(403);
            }
            resultPayLoad = jsonwebtoken_1.default.verify(auth, process.env.APP_SECRET);
            if (typeof resultPayLoad !== "object") {
                throw new Error("Token invalide");
            }
            req.user = {
                id: resultPayLoad.id,
                email: resultPayLoad.email,
                role: resultPayLoad.role,
                subscription: resultPayLoad.subscription,
            };
            next();
        }
        catch (error) {
            next(error);
        }
        return [2 /*return*/];
    });
}); };
var checkIfAdmin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            if (req.user.role === "administrateur") {
                next();
            }
            else {
                res.sendStatus(403);
            }
        }
        catch (error) {
            next(error);
        }
        return [2 /*return*/];
    });
}); };
var checkIfAdminOrUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            if (req.user.role === "administrateur" || req.user.role === "utilisateur") {
                next();
            }
            else {
                res.sendStatus(403);
            }
        }
        catch (error) {
            next(error);
        }
        return [2 /*return*/];
    });
}); };
var editPremium = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, affectedRows, updatedUser, payload, newToken, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                userId = Number(req.user.id);
                return [4 /*yield*/, userRepository_1.default.updatePremium(userId)];
            case 1:
                affectedRows = _a.sent();
                if (!affectedRows) {
                    res.status(400).json({ message: "Mise à jour échouée" });
                }
                return [4 /*yield*/, userRepository_1.default.read(userId)];
            case 2:
                updatedUser = _a.sent();
                if (!!updatedUser) return [3 /*break*/, 3];
                res.sendStatus(404);
                return [3 /*break*/, 5];
            case 3:
                payload = {
                    id: updatedUser.id,
                    email: updatedUser.email,
                    role: updatedUser.role,
                    subscription: updatedUser.subscription,
                };
                if (!process.env.APP_SECRET) {
                    throw new Error("Vous n'avez pas configuré votre APP SECRET dans le .env");
                }
                return [4 /*yield*/, jsonwebtoken_1.default.sign(payload, process.env.APP_SECRET, {
                        expiresIn: "1d",
                    })];
            case 4:
                newToken = _a.sent();
                res.cookie("auth", newToken).json({
                    message: "Abonnement premium activé",
                    id: payload.id,
                    role: payload.role,
                    email: payload.email,
                    subscription: payload.subscription,
                });
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var logout = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.clearCookie("auth").send("Déconnexion réussie");
        }
        catch (error) {
            next(error);
        }
        return [2 /*return*/];
    });
}); };
exports.default = {
    hashPassword: hashPassword,
    login: login,
    verify: verify,
    checkIfAdmin: checkIfAdmin,
    checkIfAdminOrUser: checkIfAdminOrUser,
    logout: logout,
    editPremium: editPremium,
};

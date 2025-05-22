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
var userRepository_1 = __importDefault(require("./userRepository"));
var browse = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userRepository_1.default.readAll()];
            case 1:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var read = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = Number(req.params.id);
                return [4 /*yield*/, userRepository_1.default.read(userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.sendStatus(404);
                }
                else {
                    res.json(user);
                }
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var add = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, insertId, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    hashedPassword: req.body.hashed_password,
                    subscription: req.body.subscription,
                    role: req.body.role,
                };
                return [4 /*yield*/, userRepository_1.default.create(user)];
            case 1:
                insertId = _a.sent();
                res.status(201).json({ insertId: insertId });
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                next(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var edit = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, affectedRows, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = {
                    id: Number(req.params.id),
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    hashedPassword: req.body.hashed_password,
                    subscription: req.body.subscription,
                    role: req.body.role,
                };
                return [4 /*yield*/, userRepository_1.default.update(user)];
            case 1:
                affectedRows = _a.sent();
                if (affectedRows === 0) {
                    res.sendStatus(404);
                }
                else {
                    res.sendStatus(204);
                }
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                next(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var destroy = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = Number(req.params.id);
                return [4 /*yield*/, userRepository_1.default.delete(userId)];
            case 1:
                _a.sent();
                res.sendStatus(204);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                next(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var destroyWatchlistUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteMovie, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                deleteMovie = {
                    user_id: req.user.id,
                    movie_id: req.body.movie_id,
                };
                return [4 /*yield*/, userRepository_1.default.deleteMovieToUserWatchlist(deleteMovie)];
            case 1:
                _a.sent();
                res.sendStatus(204);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                next(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var readWatchlistUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, watchlist, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = Number(req.user.id);
                return [4 /*yield*/, userRepository_1.default.read(id)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, userRepository_1.default.readWatchlistByUser(id)];
            case 2:
                watchlist = _a.sent();
                res.json({ user: user, watchlist: watchlist });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var addWatchlist = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var watchlist, id, user, watchlistId, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                watchlist = {
                    movie_id: req.body.movie_id,
                    user_id: req.user.id,
                };
                id = Number(req.user.id);
                return [4 /*yield*/, userRepository_1.default.read(id)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, userRepository_1.default.addMovieToUserWatchlist(watchlist)];
            case 2:
                watchlistId = _a.sent();
                res.status(201).json({ user: user, watchlist: watchlistId });
                return [3 /*break*/, 4];
            case 3:
                err_7 = _a.sent();
                next(err_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var sendSuccessStatus = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.sendStatus(200);
        }
        catch (error) {
            next(error);
        }
        return [2 /*return*/];
    });
}); };
exports.default = {
    browse: browse,
    read: read,
    add: add,
    destroy: destroy,
    edit: edit,
    readWatchlistUser: readWatchlistUser,
    addWatchlist: addWatchlist,
    sendSuccessStatus: sendSuccessStatus,
    destroyWatchlistUser: destroyWatchlistUser,
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = __importDefault(require("./middlewares/auth"));
var form_1 = __importDefault(require("./middlewares/form"));
var router = express_1.default.Router();
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
var movieActions_1 = __importDefault(require("./modules/movie/movieActions"));
router.get("/api/movies", movieActions_1.default.browse);
router.get("/api/movies/:id", movieActions_1.default.read);
router.post("/api/movies", auth_1.default.verify, auth_1.default.checkIfAdmin, form_1.default.validate, movieActions_1.default.add);
router.put("/api/movies/:id", auth_1.default.verify, auth_1.default.checkIfAdmin, movieActions_1.default.edit);
router.delete("/api/movies/:id", auth_1.default.verify, auth_1.default.checkIfAdmin, movieActions_1.default.destroy);
/* ************************************************************************ */
var formSignup_1 = __importDefault(require("./middlewares/formSignup"));
var userAction_1 = __importDefault(require("./modules/user/userAction"));
router.get("/api/users", auth_1.default.verify, auth_1.default.checkIfAdmin, userAction_1.default.browse);
router.get("/api/users/watchlist", auth_1.default.verify, auth_1.default.checkIfAdminOrUser, userAction_1.default.readWatchlistUser);
router.get("/api/users/:id", auth_1.default.checkIfAdmin, userAction_1.default.read);
router.post("/api/users", formSignup_1.default.validate, auth_1.default.hashPassword, userAction_1.default.add);
router.post("/api/users/watchlist", auth_1.default.verify, auth_1.default.checkIfAdminOrUser, userAction_1.default.addWatchlist);
router.post("/api/login", auth_1.default.login);
router.put("/api/users/premium", auth_1.default.verify, auth_1.default.checkIfAdminOrUser, auth_1.default.editPremium);
router.put("/api/users/:id", auth_1.default.verify, auth_1.default.checkIfAdmin, userAction_1.default.edit);
router.delete("/api/users/watchlist", auth_1.default.verify, auth_1.default.checkIfAdminOrUser, userAction_1.default.destroyWatchlistUser);
router.delete("/api/users/:id", auth_1.default.checkIfAdmin, userAction_1.default.destroy);
router.get("/api/checkAdmin", auth_1.default.verify, auth_1.default.checkIfAdmin, userAction_1.default.sendSuccessStatus);
router.get("/api/checkAdminOrUser", auth_1.default.verify, auth_1.default.checkIfAdminOrUser, userAction_1.default.sendSuccessStatus);
router.get("/api/logout", auth_1.default.logout);
/* ************************************************************************ */
exports.default = router;

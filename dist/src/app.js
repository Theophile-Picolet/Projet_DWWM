"use strict";
// app.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var compression_1 = __importDefault(require("compression"));
var zlib = __importStar(require("node:zlib"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var node_fs_1 = __importDefault(require("node:fs"));
var node_path_1 = __importDefault(require("node:path"));
var router_1 = __importDefault(require("./router"));
var app = (0, express_1.default)();
/**
 * Compression middleware
 * - threshold: 0 → compresse toutes les réponses
 * - brotli.enabled: true → active Brotli si supporté par Node.js
 * - brotli.zlib[BROTLI_PARAM_QUALITY]: 4 → qualité de compression intermédiaire
 * - filter: utilise le filtre par défaut pour ne compresser que les types Mime compressibles
 */
app.use((0, compression_1.default)({
    threshold: 0,
    brotli: {
        enabled: true,
        zlib: (_a = {},
            _a[zlib.constants.BROTLI_PARAM_QUALITY] = 4,
            _a),
    },
    filter: function (req, res) { return compression_1.default.filter(req, res); },
}));
// Lecture et écriture des cookies
app.use((0, cookie_parser_1.default)());
// Parsing du JSON des requêtes
app.use(express_1.default.json());
// CORS restreint à l'origine cliente
if (process.env.CLIENT_URL) {
    app.use((0, cors_1.default)({
        origin: [process.env.CLIENT_URL],
        credentials: true,
    }));
}
// Montage du routeur principal
app.use(router_1.default);
// Service des fichiers statiques (serveur)
var publicFolderPath = node_path_1.default.join(__dirname, "../../server/public");
if (node_fs_1.default.existsSync(publicFolderPath)) {
    app.use(express_1.default.static(publicFolderPath));
}
// Service des fichiers statiques (client build)
var clientBuildPath = node_path_1.default.join(__dirname, "../../client/dist");
if (node_fs_1.default.existsSync(clientBuildPath)) {
    app.use(express_1.default.static(clientBuildPath));
    app.get("*", function (_req, res) {
        return res.sendFile("index.html", { root: clientBuildPath });
    });
}
// Middleware global de logging des erreurs
var logErrors = function (err, req, res, next) {
    console.error(err, "on req:", req.method, req.path);
    next(err);
};
app.use(logErrors);
exports.default = app;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const packageInfo = __importStar(require("../../package.json"));
const client_1 = require("@prisma/client");
const bodyParser = __importStar(require("body-parser"));
const app = express_1.default();
const prisma = new client_1.PrismaClient();
app.use(bodyParser.json());
app.get(["/", "/status"], (_, res) => {
    res.send(`${packageInfo.description}: ${packageInfo.version}`);
});
app.get("/hba-rule", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield prisma.hbaRule.findMany());
}));
app.put("/hba-rule", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.hbaRule.create({
        data: {
            type: req.body.type,
            address: req.body.address,
            auth_method: req.body.auth_method,
            database: req.body.database,
            line_number: req.body.line_number,
            netmask: req.body.netmask,
            user_name: req.body.user_name,
            options: req.body.options
        }
    });
    res.sendStatus(201);
}));
app.delete("/hba-rule", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.hbaRule.delete({
        where: {
            id: req.body.id
        }
    });
    res.sendStatus(200);
}));
exports.default = app;

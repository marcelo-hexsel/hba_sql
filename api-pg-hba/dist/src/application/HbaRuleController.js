"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.HbaRuleController = void 0;
const express_1 = __importDefault(require("express"));
const inversify_express_utils_1 = require("inversify-express-utils");
const SequelizeHbaRuleRepository_1 = __importDefault(require("../infrastructure/SequelizeHbaRuleRepository"));
let HbaRuleController = class HbaRuleController {
    constructor() {
        this.repository = new SequelizeHbaRuleRepository_1.default();
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send(yield this.repository.findAll());
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let hbaRule = yield new SequelizeHbaRuleRepository_1.default().findById(parseInt(req.params.id));
            if (!hbaRule) {
                res.sendStatus(404);
                return;
            }
            res.send(hbaRule);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let createdHbaRule = yield new SequelizeHbaRuleRepository_1.default().create({
                type: req.body.type,
                address: req.body.address,
                authMethod: req.body.authMethod,
                databases: req.body.databases,
                lineNumber: req.body.lineNumber,
                netmask: req.body.netmask,
                userNames: req.body.userNames,
                options: req.body.options
            });
            res.status(201);
            res.send({
                id: createdHbaRule.id
            });
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new SequelizeHbaRuleRepository_1.default().delete(parseInt(req.params.id));
            res.sendStatus(200);
        });
    }
};
__decorate([
    inversify_express_utils_1.httpGet("/"),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HbaRuleController.prototype, "getAll", null);
__decorate([
    inversify_express_utils_1.httpGet("/:id"),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HbaRuleController.prototype, "getById", null);
__decorate([
    inversify_express_utils_1.httpPut("/"),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HbaRuleController.prototype, "create", null);
__decorate([
    inversify_express_utils_1.httpDelete("/:id"),
    __param(0, inversify_express_utils_1.request()), __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HbaRuleController.prototype, "deleteById", null);
HbaRuleController = __decorate([
    inversify_express_utils_1.controller("/hba-rule"),
    __metadata("design:paramtypes", [])
], HbaRuleController);
exports.HbaRuleController = HbaRuleController;

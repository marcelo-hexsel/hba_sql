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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const ExpressApp_1 = __importDefault(require("../../src/application/ExpressApp"));
describe('Endpoint: /hba-rule', () => {
    it('should list rules on GET', () => __awaiter(void 0, void 0, void 0, function* () {
        let rules = yield supertest_1.default(ExpressApp_1.default)
            .get("/hba-rule")
            .expect(200);
        expect(rules.body).toBeDefined();
        expect(rules.body.length).toBeGreaterThan(0);
    }));
    it('should create new rule on PUT and be able to retrieve it with GET + id', () => __awaiter(void 0, void 0, void 0, function* () {
        let ruleToCreate = {
            type: "host",
            address: "127.0.0.1",
            authMethod: "md5",
            databases: ["postgres"],
            lineNumber: 35,
            netmask: "255.255.255.255",
            userNames: ["postgres", "other_user"],
            options: []
        };
        let createRuleResponse = yield supertest_1.default(ExpressApp_1.default)
            .put("/hba-rule")
            .send(ruleToCreate)
            .expect(201);
        expect(createRuleResponse.body).toBeDefined();
        expect(createRuleResponse.body.id).toBeDefined();
        let getRuleResponse = yield supertest_1.default(ExpressApp_1.default)
            .get(`/hba-rule/${createRuleResponse.body.id}`)
            .expect(200);
        let createdRule = getRuleResponse.body;
        expect(createdRule.id).toEqual(createRuleResponse.body.id);
        expect(createdRule.address).toEqual(ruleToCreate.address);
        expect(createdRule.authMethod).toEqual(ruleToCreate.authMethod);
        expect(createdRule.databases).toEqual(ruleToCreate.databases);
        expect(createdRule.lineNumber).toEqual(ruleToCreate.lineNumber);
        expect(createdRule.netmask).toEqual(ruleToCreate.netmask);
        expect(createdRule.options).toEqual(ruleToCreate.options);
        expect(createdRule.type).toEqual(ruleToCreate.type);
        expect(createdRule.userNames).toEqual(ruleToCreate.userNames);
    }));
    it('should create and delete a rule on through PUT and DELETE', () => __awaiter(void 0, void 0, void 0, function* () {
        let ruleToCreate = {
            type: "host",
            address: "127.0.0.1",
            authMethod: "md5",
            databases: ["postgres"],
            lineNumber: 35,
            netmask: "255.255.255.255",
            userNames: ["postgres", "other_user"],
            options: []
        };
        let createRuleResponse = yield supertest_1.default(ExpressApp_1.default)
            .put("/hba-rule")
            .send(ruleToCreate)
            .expect(201);
        yield supertest_1.default(ExpressApp_1.default)
            .delete(`/hba-rule/${createRuleResponse.body.id}`)
            .expect(200);
        yield supertest_1.default(ExpressApp_1.default)
            .get(`/hba-rule/${createRuleResponse.body.id}`)
            .expect(404);
    }));
});

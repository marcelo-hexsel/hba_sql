import request from "supertest";
import expressApp from "../../src/application/ExpressApp";
import HbaRuleModel from "../../src/domain/HbaRuleModel";

describe('Endpoint: /hba-rule', () => {

    it('should list rules on GET', async () => {
        let rules = await request(expressApp)
            .get("/hba-rule")
            .expect(200)

        expect(rules.body).toBeDefined()
        expect(rules.body.length).toBeGreaterThan(0)
    });

    it('should create new rule on PUT and be able to retrieve it with GET + id', async () => {
        let ruleToCreate = <HbaRuleModel>{
            type: "host",
            address: "127.0.0.1",
            authMethod: "md5",
            databases: ["postgres"],
            lineNumber: 35,
            netmask: "255.255.255.255",
            userNames: ["postgres", "other_user"],
            options: []
        }

        let createRuleResponse = await request(expressApp)
            .put("/hba-rule")
            .send(ruleToCreate)
            .expect(201);

        expect(createRuleResponse.body).toBeDefined()
        expect(createRuleResponse.body.id).toBeDefined()

        let getRuleResponse = await request(expressApp)
            .get(`/hba-rule/${createRuleResponse.body.id}`)
            .expect(200);

        let createdRule = getRuleResponse.body as HbaRuleModel;
        expect(createdRule.id).toEqual(createRuleResponse.body.id)
        expect(createdRule.address).toEqual(ruleToCreate.address)
        expect(createdRule.authMethod).toEqual(ruleToCreate.authMethod)
        expect(createdRule.databases).toEqual(ruleToCreate.databases)
        expect(createdRule.lineNumber).toEqual(ruleToCreate.lineNumber)
        expect(createdRule.netmask).toEqual(ruleToCreate.netmask)
        expect(createdRule.options).toEqual(ruleToCreate.options)
        expect(createdRule.type).toEqual(ruleToCreate.type)
        expect(createdRule.userNames).toEqual(ruleToCreate.userNames)
    });

    it('should create and delete a rule on through PUT and DELETE', async () => {
        let ruleToCreate = <HbaRuleModel>{
            type: "host",
            address: "127.0.0.1",
            authMethod: "md5",
            databases: ["postgres"],
            lineNumber: 35,
            netmask: "255.255.255.255",
            userNames: ["postgres", "other_user"],
            options: []
        }

        let createRuleResponse = await request(expressApp)
            .put("/hba-rule")
            .send(ruleToCreate)
            .expect(201);


        await request(expressApp)
            .delete(`/hba-rule/${createRuleResponse.body.id}`)
            .expect(200);

        await request(expressApp)
            .get(`/hba-rule/${createRuleResponse.body.id}`)
            .expect(404);
    });

});
import request from "supertest";
import expressApp from "../../../src/application/ExpressApp";
import HbaRuleModel from "../../../src/domain/HbaRuleModel";

describe('Endpoint: /hba-rule', () => {

    it('should list rules on GET', async () => {
        let rules = await request(expressApp)
            .get("/hba-rule")
            .expect(200)

        expect(rules.body).toBeDefined()
        expect(rules.body.length).toBeGreaterThan(0)
    });

    it('should create new rule on POST and be able to retrieve it with GET + id', async () => {
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
            .post("/hba-rule")
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

    it('should create new rule on POST, change it on PUT and retrieve it with GET + id', async () => {
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
            .post("/hba-rule")
            .send(ruleToCreate)
            .expect(201);

        expect(createRuleResponse.body).toBeDefined()
        expect(createRuleResponse.body.id).toBeDefined()

        let ruleToUpdate = <HbaRuleModel>{
            id: createRuleResponse.body.id,
            type: "local",
            address: "127.0.0.2",
            authMethod: "trust",
            databases: ["other_database"],
            lineNumber: 42,
            netmask: "255.255.255.0",
            userNames: ["bla_user"],
            options: []
        }

        await request(expressApp)
            .put(`/hba-rule`)
            .send(ruleToUpdate)
            .expect(200);

        let getRuleResponse = await request(expressApp)
            .get(`/hba-rule/${ruleToUpdate.id}`)
            .expect(200);

        let updatedRule = getRuleResponse.body as HbaRuleModel;
        expect(updatedRule.id).toEqual(ruleToUpdate.id)
        expect(updatedRule.address).toEqual(ruleToUpdate.address)
        expect(updatedRule.authMethod).toEqual(ruleToUpdate.authMethod)
        expect(updatedRule.databases).toEqual(ruleToUpdate.databases)
        expect(updatedRule.lineNumber).toEqual(ruleToUpdate.lineNumber)
        expect(updatedRule.netmask).toEqual(ruleToUpdate.netmask)
        expect(updatedRule.options).toEqual(ruleToUpdate.options)
        expect(updatedRule.type).toEqual(ruleToUpdate.type)
        expect(updatedRule.userNames).toEqual(ruleToUpdate.userNames)
    });

    it('should create and delete a rule on through POST and DELETE', async () => {
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
            .post("/hba-rule")
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
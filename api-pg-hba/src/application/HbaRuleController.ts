import express from "express";
import { interfaces, controller, httpGet, httpPut, httpDelete, request, response } from "inversify-express-utils";
import { injectable, inject } from "inversify";

import HbaRuleModel from "../domain/HbaRuleModel";
import HbaRuleRepository from "../domain/HbaRuleRepository";
import SequelizeHbaRuleRepository from "../infrastructure/SequelizeHbaRuleRepository";

@controller("/hba-rule")
export class HbaRuleController implements interfaces.Controller {

    private repository: HbaRuleRepository;

    constructor() {
        this.repository = new SequelizeHbaRuleRepository();
    }

    @httpGet("/")
    public async getAll(@request() req: express.Request, @response() res: express.Response) {
        res.send(await this.repository.findAll());
    }

    @httpGet("/:id")
    public async getById(@request() req: express.Request, @response() res: express.Response) {
        let hbaRule = await new SequelizeHbaRuleRepository().findById(parseInt(req.params.id))

        if (!hbaRule) {
            res.sendStatus(404)
            return;
        }

        res.send(hbaRule);
    }

    @httpPut("/")
    public async create(@request() req: express.Request, @response() res: express.Response) {
        let createdHbaRule = await new SequelizeHbaRuleRepository().create(<HbaRuleModel>{
            type: req.body.type,
            address: req.body.address,
            authMethod: req.body.authMethod,
            databases: req.body.databases,
            lineNumber: req.body.lineNumber,
            netmask: req.body.netmask,
            userNames: req.body.userNames,
            options: req.body.options
        })

        res.status(201);
        res.send({
            id: createdHbaRule.id
        })
    }

    @httpDelete("/:id")
    public async deleteById(@request() req: express.Request, @response() res: express.Response) {
        await new SequelizeHbaRuleRepository().delete(parseInt(req.params.id))

        res.sendStatus(200);
    }
}
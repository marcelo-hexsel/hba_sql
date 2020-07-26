import express from 'express';
import {
    interfaces,
    controller,
    httpGet,
    httpPost,
    httpPut,
    httpDelete,
    request,
    response,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../inversify.types';

import HbaRuleModel from '../domain/HbaRuleModel';
import IHbaRulePort from '../domain/IHbaRulePort';

@controller('/hba-rule')
export class HbaRuleController implements interfaces.Controller {
    private hbaRulePort: IHbaRulePort;

    constructor(@inject(TYPES.HbaRulePort) hbaRulePort: IHbaRulePort) {
        this.hbaRulePort = hbaRulePort;
    }

    @httpGet('/')
    public async getAll(@response() res: express.Response) {
        res.send(await this.hbaRulePort.findAll());
    }

    @httpGet('/:id')
    public async getById(@request() req: express.Request, @response() res: express.Response) {
        const hbaRule = await this.hbaRulePort.findById(parseInt(req.params.id));

        if (!hbaRule) {
            res.sendStatus(404);
            return;
        }

        res.send(hbaRule);
    }

    @httpPost('/')
    public async create(@request() req: express.Request, @response() res: express.Response) {
        const createdHbaRule = await this.hbaRulePort.create(<HbaRuleModel>{
            type: req.body.type,
            address: req.body.address,
            authMethod: req.body.authMethod,
            databases: req.body.databases,
            lineNumber: req.body.lineNumber,
            netmask: req.body.netmask,
            userNames: req.body.userNames,
            options: req.body.options,
        });

        res.status(201);
        res.send({
            id: createdHbaRule.id,
        });
    }

    @httpPut('/')
    public async update(@request() req: express.Request, @response() res: express.Response) {
        const existingHbaRule = await this.hbaRulePort.findById(parseInt(req.body.id));

        if (!existingHbaRule) {
            res.sendStatus(404);
            return;
        }

        existingHbaRule.type = req.body.type;
        existingHbaRule.address = req.body.address;
        existingHbaRule.authMethod = req.body.authMethod;
        existingHbaRule.databases = req.body.databases;
        existingHbaRule.lineNumber = req.body.lineNumber;
        existingHbaRule.netmask = req.body.netmask;
        existingHbaRule.userNames = req.body.userNames;
        existingHbaRule.options = req.body.options;

        await this.hbaRulePort.update(existingHbaRule);

        res.status(200);
        res.send({
            id: existingHbaRule.id,
        });
    }

    @httpDelete('/:id')
    public async deleteById(@request() req: express.Request, @response() res: express.Response) {
        await this.hbaRulePort.delete(parseInt(req.params.id));

        res.sendStatus(200);
    }
}

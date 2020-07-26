import express from "express";
import * as packageInfo from "../../package.json";
import * as bodyParser from 'body-parser'
import SequelizeHbaRuleRepository from "../infrastructure/SequelizeHbaRuleRepository";
import HbaRuleModel from "../domain/HbaRuleModel";

const app = express()

app.use(bodyParser.json())

app.get(["/", "/status"], (_: express.Request, res: express.Response): void => {
    res.send(`${packageInfo.description}: ${packageInfo.version}`);
});

app.get("/hba-rule", async (_: express.Request, res: express.Response): Promise<void> => {
    res.send(await new SequelizeHbaRuleRepository().findAll());
})

app.get("/hba-rule/:id", async (req: express.Request, res: express.Response): Promise<void> => {
    let hbaRule = await new SequelizeHbaRuleRepository().findById(parseInt(req.params.id))

    if (!hbaRule) {
        res.sendStatus(404)
        return;
    }

    res.send(hbaRule);
})

app.put("/hba-rule", async (req: express.Request, res: express.Response): Promise<void> => {
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
})

app.delete("/hba-rule/:id", async (req: express.Request, res: express.Response): Promise<void> => {
    await new SequelizeHbaRuleRepository().delete(parseInt(req.params.id))

    res.sendStatus(200);
})

export default app;

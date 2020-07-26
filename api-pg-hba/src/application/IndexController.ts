import express from 'express';
import * as packageInfo from '../../package.json';
import { interfaces, controller, httpGet, request, response } from 'inversify-express-utils';

@controller('/')
export class IndexController implements interfaces.Controller {
    @httpGet('/')
    public async version(@request() req: express.Request, @response() res: express.Response) {
        res.send(`${packageInfo.description}: ${packageInfo.version}`);
    }
}

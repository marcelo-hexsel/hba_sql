import { InversifyExpressServer } from 'inversify-express-utils';
import { dependecyInjectionContainer } from "../inversify.config";
import * as bodyParser from 'body-parser'

let server = new InversifyExpressServer(dependecyInjectionContainer);
server.setConfig((app) => {
    app.use(bodyParser.json());
});

export default server.build();
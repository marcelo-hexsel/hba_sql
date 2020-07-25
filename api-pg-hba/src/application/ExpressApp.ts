import "dotenv/config";
import express from "express";
import * as packageInfo from "../../package.json";

const app = express();

app.get(["/", "/status"], (_: express.Request, res: express.Response): void => {
    res.send(`${packageInfo.description}: ${packageInfo.version}`);
});

export default app;

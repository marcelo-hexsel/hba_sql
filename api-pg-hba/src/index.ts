import "reflect-metadata";
import expressApp from "./application/ExpressApp";
import { AddressInfo } from "net";

console.log("Bootstrapping hba_sql api");

const server = expressApp.listen(8080, (): void => {
    console.log(`Ready on http://localhost:${(server.address() as AddressInfo).port}`);
});

process.on("SIGTERM", async () => {
    server.close();
});

import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./inversify.types";


const dependecyInjectionContainer = new Container();
// dependecyInjectionContainer.bind<PrismaClient>(TYPES.PrismaClient).to(PrismaClient);

export { dependecyInjectionContainer };

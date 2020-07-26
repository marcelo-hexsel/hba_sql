import { Container } from "inversify";
import { TYPES } from "./inversify.types";

//controllers
import "./application/IndexController"
import "./application/HbaRuleController"

const dependecyInjectionContainer = new Container();

export { dependecyInjectionContainer };

import { Container } from "inversify";
import { TYPES } from "./inversify.types";

import IHbaRulePort from "./domain/IHbaRulePort";
import HbaRuleService from "./domain/HbaRuleService";
import IHbaRuleRepository from "./domain/IHbaRuleRepository";
import SequelizeHbaRuleRepository from "./infrastructure/SequelizeHbaRuleRepository";

//controllers
import "./application/IndexController"
import "./application/HbaRuleController"

const dependecyInjectionContainer = new Container()

dependecyInjectionContainer.bind<IHbaRulePort>(TYPES.HbaRulePort).to(HbaRuleService)
dependecyInjectionContainer.bind<IHbaRuleRepository>(TYPES.HbaRuleRepository).to(SequelizeHbaRuleRepository)

export { dependecyInjectionContainer };

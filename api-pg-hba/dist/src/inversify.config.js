"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dependecyInjectionContainer = void 0;
const inversify_1 = require("inversify");
//controllers
require("./application/IndexController");
require("./application/HbaRuleController");
const dependecyInjectionContainer = new inversify_1.Container();
exports.dependecyInjectionContainer = dependecyInjectionContainer;

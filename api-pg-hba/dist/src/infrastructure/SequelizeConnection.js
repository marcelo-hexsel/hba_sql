"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const sequelize_1 = require("sequelize");
pg_1.default.defaults.parseInt8 = true;
exports.default = new sequelize_1.Sequelize('postgres://postgres:senha@localhost:5432/postgres');

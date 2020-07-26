import pg from "pg"
import { Sequelize } from "sequelize";

pg.defaults.parseInt8 = true

export default new Sequelize('postgres://postgres:senha@localhost:5432/postgres');

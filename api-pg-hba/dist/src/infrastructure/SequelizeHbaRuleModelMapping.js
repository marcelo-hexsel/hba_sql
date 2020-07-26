"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeConnection_1 = __importDefault(require("./SequelizeConnection"));
const sequelize_1 = require("sequelize");
class HbaRuleSequelizeMapping extends sequelize_1.Model {
}
exports.default = HbaRuleSequelizeMapping;
HbaRuleSequelizeMapping.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    lineNumber: {
        type: sequelize_1.DataTypes.BIGINT,
        field: "line_number"
    },
    type: {
        type: sequelize_1.DataTypes.TEXT,
        field: "type"
    },
    databases: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.TEXT),
        field: "database"
    },
    userNames: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.TEXT),
        field: "user_name"
    },
    address: {
        type: sequelize_1.DataTypes.TEXT,
        field: "address"
    },
    netmask: {
        type: sequelize_1.DataTypes.TEXT,
        field: "netmask"
    },
    authMethod: {
        type: sequelize_1.DataTypes.TEXT,
        field: "auth_method"
    },
    options: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.TEXT),
        field: "options"
    },
    error: {
        type: sequelize_1.DataTypes.TEXT,
        field: "error"
    }
}, {
    sequelize: SequelizeConnection_1.default,
    modelName: 'HbaRule',
    tableName: "file",
    schema: "hba_sql",
    freezeTableName: true,
    timestamps: false
});

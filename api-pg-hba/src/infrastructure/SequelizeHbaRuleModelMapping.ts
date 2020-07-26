import sequelizeConnection from "./SequelizeConnection";
import { DataTypes, Model } from 'sequelize';
import HbaRuleModel from "../domain/HbaRuleModel";

export default class HbaRuleSequelizeMapping extends Model<HbaRuleModel> implements HbaRuleModel {
    id: number;
    lineNumber: number;
    type: string;
    databases: string[];
    userNames: string[];
    address: string;
    netmask: string;
    authMethod: string;
    options: string[];
    error: string;
}

HbaRuleSequelizeMapping.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    lineNumber: {
        type: DataTypes.BIGINT,
        field: "line_number"
    },
    type: {
        type: DataTypes.TEXT,
        field: "type"
    },
    databases: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        field: "database"
    },
    userNames: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        field: "user_name"
    },
    address: {
        type: DataTypes.TEXT,
        field: "address"
    },
    netmask: {
        type: DataTypes.TEXT,
        field: "netmask"
    },
    authMethod: {
        type: DataTypes.TEXT,
        field: "auth_method"
    },
    options: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        field: "options"
    },
    error: {
        type: DataTypes.TEXT,
        field: "error"
    }
}, {
    sequelize: sequelizeConnection,
    modelName: 'HbaRule',
    tableName: "file",
    schema: "hba_sql",
    freezeTableName: true,
    timestamps: false
});

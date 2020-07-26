import { injectable } from 'inversify';
import HbaRuleRepository from '../domain/IHbaRuleRepository';
import HbaRuleModel from '../domain/HbaRuleModel';
import SequelizeHbaRuleModelMapping from './SequelizeHbaRuleModelMapping';

@injectable()
export default class SequelizeHbaRuleRepository implements HbaRuleRepository {
    async update(hbaRule: HbaRuleModel): Promise<void> {
        await SequelizeHbaRuleModelMapping.update(
            {
                address: hbaRule.address,
                authMethod: hbaRule.authMethod,
                databases: hbaRule.databases,
                lineNumber: hbaRule.lineNumber,
                netmask: hbaRule.netmask,
                options: hbaRule.options,
                type: hbaRule.type,
                userNames: hbaRule.userNames,
            },
            {
                where: {
                    id: hbaRule.id,
                },
            },
        );
    }

    async delete(id: number): Promise<void> {
        await SequelizeHbaRuleModelMapping.destroy({
            where: {
                id,
            },
        });
    }

    async create(hbaRule: HbaRuleModel): Promise<HbaRuleModel> {
        return await SequelizeHbaRuleModelMapping.create(hbaRule);
    }

    async findById(id: number): Promise<HbaRuleModel> {
        return await SequelizeHbaRuleModelMapping.findByPk(id);
    }

    async findAll(): Promise<HbaRuleModel[]> {
        return await SequelizeHbaRuleModelMapping.findAll();
    }
}

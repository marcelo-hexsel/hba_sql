import { injectable } from "inversify";
import HbaRuleRepository from "../domain/IHbaRuleRepository";
import HbaRuleModel from "../domain/HbaRuleModel";
import SequelizeHbaRuleModelMapping from "./SequelizeHbaRuleModelMapping";

@injectable()
export default class SequelizeHbaRuleRepository implements HbaRuleRepository {
    async delete(id: number): Promise<void> {
        await SequelizeHbaRuleModelMapping.destroy({
            where: {
                id
            }
        })
    }
    async create(hbaRule: HbaRuleModel): Promise<HbaRuleModel> {
        return await SequelizeHbaRuleModelMapping.create(hbaRule);
    }

    async findById(id: number): Promise<HbaRuleModel> {
        return await SequelizeHbaRuleModelMapping.findByPk(id);
    }

    async findAll(): Promise<HbaRuleModel[]> {
        return await SequelizeHbaRuleModelMapping.findAll()
    }

}
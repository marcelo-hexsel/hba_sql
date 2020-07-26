import HbaRuleModel from './HbaRuleModel';

export default interface IHbaRuleRepository {
    findById(id: number): Promise<HbaRuleModel>;

    findAll(): Promise<HbaRuleModel[]>;

    create(hbaRule: HbaRuleModel): Promise<HbaRuleModel>;

    update(hbaRule: HbaRuleModel): Promise<void>;

    delete(id: number): Promise<void>;
}

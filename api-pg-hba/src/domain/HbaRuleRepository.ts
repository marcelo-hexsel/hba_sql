import HbaRuleModel from "./HbaRuleModel";

export default interface IHbaRuleRepository {

    findById(id: number): Promise<HbaRuleModel>;

    findAll(): Promise<HbaRuleModel[]>;

    create(hbaRule: HbaRuleModel): Promise<HbaRuleModel>;

    delete(id: number): Promise<void>;

}
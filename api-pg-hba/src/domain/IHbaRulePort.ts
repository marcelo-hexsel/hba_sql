import HbaRuleModel from "./HbaRuleModel";

export default interface IHbaRulePort {

    findAll(): Promise<HbaRuleModel[]>;

    findById(id: number): Promise<HbaRuleModel>;

    create(hbaRule: HbaRuleModel): Promise<HbaRuleModel>;

    delete(id: number): Promise<void>;



}
import { injectable, inject } from 'inversify';
import { TYPES } from '../inversify.types';
import IHbaRulePort from './IHbaRulePort';
import HbaRuleModel from './HbaRuleModel';
import HbaRuleRepository from './IHbaRuleRepository';

@injectable()
export default class HbaRuleService implements IHbaRulePort {
    private repository: HbaRuleRepository;

    constructor(@inject(TYPES.HbaRuleRepository) repository: HbaRuleRepository) {
        this.repository = repository;
    }

    async update(hbaRule: HbaRuleModel): Promise<HbaRuleModel> {
        await this.repository.update(hbaRule);
        return hbaRule;
    }

    async delete(id: number): Promise<void> {
        return await this.repository.delete(id);
    }

    async create(hbaRule: HbaRuleModel): Promise<HbaRuleModel> {
        return await this.repository.create(hbaRule);
    }

    async findById(id: number): Promise<HbaRuleModel> {
        return await this.repository.findById(id);
    }

    async findAll(): Promise<HbaRuleModel[]> {
        return await this.repository.findAll();
    }
}

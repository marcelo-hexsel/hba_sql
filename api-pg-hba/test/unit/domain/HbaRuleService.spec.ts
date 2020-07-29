import HbaRuleService from '../../../src/domain/HbaRuleService';
import IHbaRuleRepository from '../../../src/domain/IHbaRuleRepository';

import hbaRuleFixtures from '../../fixture/hbaRuleFixtures';

describe('HbaRuleService', () => {
    let service: HbaRuleService;
    let repository: IHbaRuleRepository;

    beforeEach(() => {
        repository = <IHbaRuleRepository>{};

        repository.create = jest.fn();
        repository.delete = jest.fn();
        repository.findAll = jest.fn();
        repository.findById = jest.fn();
        repository.update = jest.fn();

        service = new HbaRuleService(repository);
    });

    describe('create', () => {
        it('should call repository create and return create hbaRule', async () => {
            const hbaRule = hbaRuleFixtures.validHbaRule;

            repository.create = jest.fn(() => Promise.resolve(hbaRuleFixtures.anotherValidHbaRule));
            const createdHbaRule = await service.create(hbaRule);

            expect(repository.create).toHaveBeenCalledWith(hbaRule);
            expect(createdHbaRule).toBe(hbaRuleFixtures.anotherValidHbaRule);
        });
    });

    describe('update', () => {
        it('should call repository update and return updated hbaRule', async () => {
            const hbaRule = hbaRuleFixtures.validHbaRule;

            const updatedHbaRule = await service.update(hbaRule);

            expect(repository.update).toHaveBeenCalledWith(hbaRule);
            expect(updatedHbaRule).toBe(hbaRule);
        });
    });

    describe('delete', () => {
        it('should call repository delete', async () => {
            await service.delete(1);

            expect(repository.delete).toHaveBeenCalledWith(1);
        });
    });

    describe('findAll', () => {
        it('should call repository findAll', async () => {
            await service.findAll();

            expect(repository.findAll).toHaveBeenCalled();
        });
    });

    describe('findById', () => {
        it('should call repository findById', async () => {
            await service.findById(1);

            expect(repository.findById).toHaveBeenCalledWith(1);
        });
    });
});

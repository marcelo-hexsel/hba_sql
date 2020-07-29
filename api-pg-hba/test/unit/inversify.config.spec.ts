import { dependecyInjectionContainer } from '../../src/inversify.config';
import { TYPES } from '../../src/inversify.types';
import HbaRuleService from '../../src/domain/HbaRuleService';
import SequelizeHbaRuleRepository from '../../src/infrastructure/SequelizeHbaRuleRepository';

describe('Inversify configurations', () => {
    it('should bind types in dependency injection container', () => {
        expect(dependecyInjectionContainer.isBound(TYPES.HbaRulePort)).toBe(true);
        expect(dependecyInjectionContainer.isBound(TYPES.HbaRuleRepository)).toBe(true);

        expect(dependecyInjectionContainer.get(TYPES.HbaRulePort)).toBeInstanceOf(HbaRuleService);
        expect(dependecyInjectionContainer.get(TYPES.HbaRuleRepository)).toBeInstanceOf(SequelizeHbaRuleRepository);
    });
});

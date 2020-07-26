import { HbaRuleController } from '../../../src/application/HbaRuleController';
import IHbaRulePort from '../../../src/domain/IHbaRulePort';
import express from 'express';
import hbaRuleFixtures from '../../fixture/hbaRuleFixtures';

describe('HbaRuleController', () => {
    let controller: HbaRuleController;

    const hbaRulePort: IHbaRulePort = <IHbaRulePort>{};

    beforeEach(() => {
        hbaRulePort.delete = jest.fn();
        hbaRulePort.create = jest.fn();
        hbaRulePort.findAll = jest.fn();
        hbaRulePort.findById = jest.fn();
        hbaRulePort.update = jest.fn();

        controller = new HbaRuleController(hbaRulePort);
    });

    it('shoud call port findAll and return its response', async () => {
        const allHbaRules = [hbaRuleFixtures.validHbaRule];
        const mockResponse = <express.Response>{};

        mockResponse.send = jest.fn();

        hbaRulePort.findAll = jest.fn(async () => await Promise.resolve(allHbaRules));

        await controller.getAll(mockResponse);

        expect(hbaRulePort.findAll).toHaveBeenCalled();
        expect(mockResponse.send).toHaveBeenCalledWith(allHbaRules);
    });
});

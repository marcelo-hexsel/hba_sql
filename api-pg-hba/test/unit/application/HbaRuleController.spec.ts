import { HbaRuleController } from '../../../src/application/HbaRuleController';
import IHbaRulePort from '../../../src/domain/IHbaRulePort';
import express, { response } from 'express';
import hbaRuleFixtures from '../../fixture/hbaRuleFixtures';
import HbaRuleModel from '../../../src/domain/HbaRuleModel';

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

    describe('findAll', () => {
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

    describe('deleteById', () => {
        it('should call port delete using request parameter to delete rule', async () => {
            const mockRequest = <express.Request>{};
            mockRequest.params = { id: '123' };

            const mockResponse = <express.Response>{};
            mockResponse.sendStatus = jest.fn();

            hbaRulePort.delete = jest.fn(async () => await Promise.resolve());

            await controller.deleteById(mockRequest, mockResponse);

            expect(hbaRulePort.delete).toHaveBeenCalledWith(123);
            expect(mockResponse.sendStatus).toHaveBeenCalledWith(200);
        });
    });

    describe('getById', () => {
        it('should return 404 when rule is not found by id', async () => {
            const mockRequest = <express.Request>{};
            mockRequest.params = { id: '123' };

            const mockResponse = <express.Response>{};
            mockResponse.sendStatus = jest.fn();

            hbaRulePort.findById = jest.fn(async () => await Promise.resolve(null));

            await controller.getById(mockRequest, mockResponse);

            expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
        });

        it('should return hbaRule found by id', async () => {
            const mockRequest = <express.Request>{};
            mockRequest.params = { id: '123' };

            const mockResponse = <express.Response>{};
            mockResponse.send = jest.fn();

            hbaRulePort.findById = jest.fn(async () => await Promise.resolve(hbaRuleFixtures.validHbaRule));

            await controller.getById(mockRequest, mockResponse);

            expect(mockResponse.send).toHaveBeenCalledWith(hbaRuleFixtures.validHbaRule);
        });
    });

    describe('create', () => {
        it('should create a complete hbaRule with body data', async () => {
            const mockRequest = <express.Request>{};
            mockRequest.body = hbaRuleFixtures.validHbaRule;

            const mockResponse = <express.Response>{};
            mockResponse.status = jest.fn();
            mockResponse.send = jest.fn();

            hbaRulePort.create = jest.fn(
                async (hbaRule) => await Promise.resolve({ id: 1, ...hbaRule } as HbaRuleModel),
            );

            await controller.create(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.send).toHaveBeenCalledWith({ id: 1 });
        });
    });

    describe('update', () => {
        it('should return 404 when hbaRule is not found by id', async () => {
            const mockRequest = <express.Request>{};
            mockRequest.body = { id: 1, ...hbaRuleFixtures.validHbaRule };

            const mockResponse = <express.Response>{};
            mockResponse.sendStatus = jest.fn();

            hbaRulePort.findById = jest.fn(() => {
                return Promise.resolve(null);
            });

            await controller.update(mockRequest, mockResponse);

            expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
        });

        it('should update values from hbaRule', async () => {
            const mockRequest = <express.Request>{};
            mockRequest.body = { id: 1, ...hbaRuleFixtures.validHbaRule };

            const mockResponse = <express.Response>{};
            mockResponse.status = jest.fn();
            mockResponse.send = jest.fn();

            hbaRulePort.findById = jest.fn(() => {
                return Promise.resolve({ id: 1, ...hbaRuleFixtures.anotherValidHbaRule });
            });
            hbaRulePort.update = jest.fn();

            await controller.update(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.send).toHaveBeenCalledWith({ id: 1 });
            expect(hbaRulePort.update).toHaveBeenCalledWith({ id: 1, ...hbaRuleFixtures.validHbaRule });
        });
    });
});

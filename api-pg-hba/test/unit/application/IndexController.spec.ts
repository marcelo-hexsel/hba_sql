import { IndexController } from '../../../src/application/IndexController';
import express from 'express';
import * as packageInfo from '../../../package.json';

describe('IndexController', () => {
    let indexController: IndexController;

    beforeEach(() => {
        indexController = new IndexController();
    });

    it('should return application name and version', () => {
        const mockResponse = <express.Response>{};

        mockResponse.send = jest.fn();

        indexController.version(null, mockResponse);

        expect(mockResponse.send).toHaveBeenCalledWith(`api-pg-hba: ${packageInfo.version}`);
    });
});

import request from 'supertest';
import expressApp from '../../../src/application/ExpressApp';

const SEMVER_STRICT_MATCH = /^((([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)$/gm;

describe('Endpoint: /', () => {
    it('should return application name and version on GET', async () => {
        const indexResponse = await request(expressApp).get('/').expect(200);

        expect(indexResponse.text.split(':')[0].trim()).toMatch(/api-pg-hba/);
        expect(indexResponse.text.split(':')[1].trim()).toMatch(SEMVER_STRICT_MATCH);
    });
});

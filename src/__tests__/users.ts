import request from 'supertest';
import app from '../server';

describe('Users', () => {
    it('should return 200', async () => {
        const res = await request(app)
            .get('/api/users')
        expect(res.statusCode).toEqual(200);
    })
})

import request from 'supertest';
import app from '../server';

describe('Users', () => {
    describe('GET /users', () => {
        it('should return 200', async () => {
            const res = await request(app)
                .get('/api/users')
            expect(res.statusCode).toEqual(200);
        });

        it('should return all users', async () => {
            const res = await request(app)
                .get('/api/users')
            expect(res.statusCode).toEqual(200);
            expect(res.body.data).toHaveLength(2);
        })
    })
})

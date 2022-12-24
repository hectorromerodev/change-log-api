import app from '../server';
import request from 'supertest';

describe('GET /', () => {
    it('should return Hello World and Status 200 OK', async () => {
        const res = await request(app).get('/');
        expect(res.body.message).toBe("Hello World");
        expect(res.status).toBe(200);
    });
});




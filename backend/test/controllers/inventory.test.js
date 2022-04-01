const request = require('supertest');
const app = require('../../index');

describe('POST /api/inventory/product', () => {
    //token should be added for login in postman
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjQ4NzM4NTc3LCJleHAiOjE2NDg3ODE3Nzd9.8Od1cEpKWuFa2-EJlgSQGQljJuRe5slPNej_bKVdMpU';
    const data = {
        producto: "producto",
        cantidad: 300,
        descripcion: "descripcion",
        estado: 'A'
    }
    
    test('Should respond with a 401 status code if user input empty', async () => {
        const response = await request(app).post('/api/inventory/product').send(data);
        expect(response.statusCode).toBe(401);
    });

    test('Should respond with a 200 status code if user has token', async () => {
        const response = await request(app).post('/api/inventory/product').set('Authorization', token).send(data);
        expect(response.statusCode).toBe(200);
    });

    test('Should respond with a 200 status code if user send data complete', async () => {
        const response = await request(app).post('/api/inventory/product').set('Authorization', token).send(data);
        expect(response.statusCode).toBe(200);
    });
})
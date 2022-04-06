const request = require('supertest');
const app = require('../../index');

const data = {
    producto: "producto",
    cantidad: 300,
    descripcion: "descripcion",
    estado: 'A'
}

describe('POST /api/inventory/product', () => {

    test('Should respond with a 401 status code if user has an invalid token', async () => {
        const response = await request(app).post('/api/inventory/product').send(data);
        expect(response.statusCode).toBe(401);
    });


    //token should be added for login in postman
    const token = process.env.TOKEN_FOR_TEST

    test('Should respond with a 200 status code if user has token an create product', async () => {
        const response = await request(app).post('/api/inventory/product').set('Authorization', token).send(data);
        expect(response.statusCode).toBe(200);
    });
});

describe('PUT /api/product/:id', () => {

    test('Should respond with a 401 status code if user has an invalid token', async () => {
        const response = await request(app).put(`/api/product/${1}`).send(data);
        expect(response.statusCode).toBe(401);
    });


    //token should be added for login in postman
    const token = process.env.TOKEN_FOR_TEST

    test('Should respond with a 200 status code if user has token and update product', async () => {
        const response = await request(app).put(`/api/product/${1}`).set('Authorization', token).send(data);
        expect(response.statusCode).toBe(200);
    });
})
const request = require('supertest');
const app = require('../../index');

const data = {
    producto: "Pollo",
    cantidad: 10.5,
    descripcion: "Pollo de Ales",
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
});

describe('GET /api/products', () => {

    test('Should respond with a 401 status code if user has an invalid token', async () => {
        const response = await request(app).get('/api/products');
        expect(response.statusCode).toBe(401);
    });


    //token should be added for login in postman
    const token = process.env.TOKEN_FOR_TEST

    test('Should respond with a 200 status code if user has token and get product data', async () => {
        const response = await request(app).get('/api/products').set('Authorization', token);
        expect(response.statusCode).toBe(200);
        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
    });
});

describe('DELETE /api/products', () => {

    test('Should respond with a 401 status code if user has an invalid token', async () => {
        const response = await request(app).delete(`/api/product/${1}`);
        expect(response.statusCode).toBe(401);
    });


    //token should be added for login in postman
    const token = process.env.TOKEN_FOR_TEST

    test('Should respond with a 200 status code if user has token and get product data', async () => {
        const response = await request(app).delete(`/api/product/${1}`).set('Authorization', token);
        expect(response.statusCode).toBe(200);
        const productDeleted = await request(app).get(`/api/product/${1}`).set('Authorization', token);
        expect(productDeleted.body.data.estado).toBe("I");
    });
});
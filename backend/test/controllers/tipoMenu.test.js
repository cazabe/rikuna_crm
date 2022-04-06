const request = require('supertest');
const app = require('../../index');

const data = {
    menu: "menu vegetariano",
    precio_unitario: 4.50
}

const editData = {
    precio_unitario: 5
}

describe('POST /api/tipo/menu', () => {

    test('Should respond with a 401 status code if user has an invalid token', async () => {
        const response = await request(app).post('/api/tipo/menu').send(data);
        expect(response.statusCode).toBe(401);
    });


    //token should be added for login in postman
    const token = process.env.TOKEN_FOR_TEST

    test('Should respond with a 200 status code if user has token an create product', async () => {
        const response = await request(app).post('/api/tipo/menu').set('Authorization', token).send(data);
        expect(response.statusCode).toBe(200);
        expect(response.body.data.message).toBe('Menu creado correctamente');
    });
});

describe('GET /api/tipo/menu', () => {

    test('Should respond with a 401 status code if user has an invalid token', async () => {
        const response = await request(app).get('/api/tipo/menu');
        expect(response.statusCode).toBe(401);
    });


    //token should be added for login in postman
    const token = process.env.TOKEN_FOR_TEST

    test('Should respond with a 200 status code if user has token and return all tipos menus in db', async () => {
        const response = await request(app).get('/api/tipo/menu').set('Authorization', token);
        expect(response.statusCode).toBe(200);
        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
    });
});

describe('PUT /api/tipo/menu/:id', () => {

    test('Should respond with a 401 status code if user has an invalid token', async () => {
        const response = await request(app).put(`/api/tipo/menu/${1}`).send(editData);
        expect(response.statusCode).toBe(401);
    });


    //token should be added for login in postman
    const token = process.env.TOKEN_FOR_TEST

    test('Should respond with a 200 status code if user has token and update product', async () => {
        const response = await request(app).put(`/api/tipo/menu/${1}`).set('Authorization', token).send(editData);
        expect(response.statusCode).toBe(200);
    });
});


const request = require('supertest');
const app = require('../../index');

describe('POST /api/register/user', () => {
    //token should be added for login in postman
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjQ4NTc0ODM5LCJleHAiOjE2NDg2MTgwMzl9.xA75xsLypR7x9nkPYrzLbVJPbOfuq4SWo2O_pXSEv5E';
    const data = {
        user: "admin rikuna tres",
        password: "12345678",
        email: "rikuna@hotmail.com",
        userRol: 1
    }
    test('Should respond with a 401 status code if user dosen\'t provide a token', async () => {
        const response = await request(app).post('/api/register/user').send(data);
        expect(response.statusCode).toBe(401);
    });

    test('Should respond with a 200 status code if user has token and approve rol', async () => {
        const response = await request(app).post('/api/register/user').set('Authorization', token).send(data);
        expect(response.statusCode).toBe(200);
    });
})
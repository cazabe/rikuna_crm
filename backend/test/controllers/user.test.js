const request = require('supertest');
const app = require('../../index');

//User data
const data = {
    username: "admin rikuna tres",
    password: "12345678",
    email: "rikuna@hotmail.com",
    userRol: 1
}
//User edit data
const userEditData = {
    username: "admin rikuna editado",
}

describe('POST /api/register/user', () => {
    //token should be added for login in postman
    const token = process.env.TOKEN_FOR_TEST

    test('Should respond with a 401 status code if user dosen\'t provide a token', async () => {
        const response = await request(app).post('/api/register/user').send(data);
        expect(response.statusCode).toBe(401);
    });

    test('Should respond with a 200 status code if user has token, approved rol and create an user', async () => {
        const response = await request(app).post('/api/register/user').set('Authorization', token).send(data);
        expect(response.statusCode).toBe(200);
    });
})

describe('GET /api/user', () => {
    test('Should respond with a 401 status code if user dosen\'t provide a token', async () => {
        const response = await request(app).get('/api/user');
        expect(response.statusCode).toBe(401);
    });

    //token should be added for login in postman
    const token = process.env.TOKEN_FOR_TEST

    test('Should respond with a 200 status code and a array of users if user has token and approved rol', async () => {
        const response = await request(app).get('/api/user').set('Authorization', token);
        expect(response.statusCode).toBe(200);
        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
    });
});

describe('PUT /api/user/:id', () => {
    //token should be added for login in postman
    const token = process.env.TOKEN_FOR_TEST
    test('Should respond with a 200 status code if user was upadted correctly', async () => {
        const response = await request(app).put(`/api/user/${1}`).set('Authorization', token).send(userEditData);
        expect(response.statusCode).toBe(200);
    });
});

describe('DELETE /api/user/:id', () => {
    //token should be added for login in postman
    const token = process.env.TOKEN_FOR_TEST
    test('Should respond with a 200 status code if user was deleted correctly', async () => {
        const response = await request(app).delete(`/api/user/${7}`).set('Authorization', token);
        expect(response.statusCode).toBe(200);
    });
});

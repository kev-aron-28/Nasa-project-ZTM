const request = require('supertest');
const app = require('../../app');

describe('test GET /launches ', () => {
    test('should respond with 200 success', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200)
    });
});

describe('test POST /launches', () => {
    
    const launchData = {
        mission: "KTM155",
        rocket: "KT_128",
        target: "Kepler-186",
        launchDate: "January 25, 2028"
    } 
    
    const expectedLaunchResponse = {
        mission: "KTM155",
        rocket: "KT_128",
        target: "Kepler-186",
        launchDate: "2028-01-25T06:00:00.000Z"
    }

    const launchDataWithoutDate = {
        mission: "KTM155",
        rocket: "KT_128",
        target: "Kepler-186",
    }

    const launchDataWithWrongDate = {
        mission: "KTM155",
        rocket: "KT_128",
        target: "Kepler-186",
        launchDate: "invalid"
    }

    test('should respond with 201 created', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchData)
            .expect('Content-Type', /json/)
            .expect(201);
    
        expect(response.body).toMatchObject(expectedLaunchResponse);
    });

    test('should catch missing required propierty', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Invalid launch'
        });
    });
    
    test('should catch invalid dates', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithWrongDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            msg: 'Invalid launch date'
        })
    });
});
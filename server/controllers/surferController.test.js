const { MongoClient } = require('mongodb');
const Surfer = require('../models/Surfer');
const { createSurfer, getSurfer } = require('../controllers/surferController');

describe('insert', () => {
    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db();
    });

    afterAll(async () => {
        await connection.close();
    });


    it("should create a surfer for the surfers collection", async () => {
        const mockRequest = {
            body: {
                _id: '1234',
                userName: 'surferName',
                userPassword: 'testing123'
            }
        };

        const mockResponse = {
            json: jest.fn(),
            status: jest.fn(() => mockResponse)
        };

        await createSurfer(mockRequest, mockResponse)
    })
});


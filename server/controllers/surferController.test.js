const { MongoClient } = require('mongodb');
const { createSurfer, getSurfer } = require('../controllers/surferController');

describe('Testing surfercontroller methods', () => {
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
                _id: '123',
                userName: 'surferName',
                userPassword: 'testing123'
            }
        };

        const mockResponse = {
            json: jest.fn(),
            status: jest.fn(() => mockResponse)
        };

        await createSurfer(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalled();

        
    });

    it("should get a surfer by the surfer id", async () => {

    })
});


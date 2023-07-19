// const { MongoClient } = require('mongodb');
// const {MongoMemoryServer} = require('')
const { createSurfer, getSurfer } = require('../controllers/surferController');

// describe('Testing surfercontroller methods', () => {
//     let connection;
//     let db;

//     beforeAll(async () => {
//         connection = await MongoClient.connect(global.__MONGO_URI__, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         db = await connection.db();
//     });

//     afterAll(async () => {
//         await connection.close();
//     });


//     test("should create a surfer for the surfers collection", async () => {
//         const mockRequest = {
//             body: {
//                 userName: 'surferName',
//                 userPassword: 'testing123'
//             }
//         };

//         const mockResponse = {
//             json: jest.fn(),
//             status: jest.fn(() => mockResponse)
//         };

//         await createSurfer(mockRequest, mockResponse);

//         expect(mockResponse.json).toHaveBeenCalled();


//     });

// });

const { connect, clearDatabase, closeDatabase } = require('../utils/db_test_setup');
beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe("create surfer test", () => {
    it("should create a surfer for the surfer collection", async () => {
        const mockRequest = {
            body: {
                userName: 'surferName',
                userPassword: 'testing123'
            }
        };
        const mockResponse = {
            json: jest.fn(),
            status: jest.fn(() => mockResponse)
        };
        await createSurfer(mockRequest, mockResponse);


    })
})
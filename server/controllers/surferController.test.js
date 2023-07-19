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
                _id: '64b74f23e0ae231cf10c340c',
                userName: 'surferName',
                userPassword: 'testing123'
            }
        };
        const mockResponse = {
            json: jest.fn(),
            status: jest.fn(() => mockResponse)
        };
        // console.log(mockResponse.json, "json stuff")
        await createSurfer(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);




    })

    it("should get a surfer by their id", async () => {

        const mockRequestCreate = {
            body: {
                _id: '64b74f23e0ae231cf10c340c',
                userName: 'surferName',
                userPassword: 'testing123'
            }
        };
        const mockResponseCreate = {
            json: jest.fn(),
            status: jest.fn(() => mockResponseCreate)
        };
        // console.log(mockResponse.json, "json stuff")
        await createSurfer(mockRequestCreate, mockResponseCreate);

        const mockRequest = {
            params: {
                surferId: '64b74f23e0ae231cf10c340c'
            }
        };

        const mockResponse = {
            json: jest.fn(),
            status: jest.fn(() => mockResponse)
        };

        await getSurfer(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        // console.log(mockResponse.json.mock.lastCall[0], "json data?")
        expect(mockResponse.json.mock.lastCall[0].userName).toBe('surferName')

    })
})
const { createSurfer, getSurfer } = require('../controllers/surferController');
const { connect, clearDatabase, closeDatabase } = require('../utils/db_test_setup');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

const basicMockResponse = {
    json: jest.fn(),
    status: jest.fn(() => basicMockResponse),
    send: jest.fn(() => basicMockResponse)
};

const mockRequestBody = {
    body: {
        _id: '64b74f23e0ae231cf10c340c',
        userName: 'surferName',
        userPassword: 'testing123'
    }
};

describe("create surfer test", () => {
    it("should create a surfer for the surfer collection", async () => {

        await createSurfer(mockRequestBody, basicMockResponse);

        expect(basicMockResponse.json).toHaveBeenCalled();
        expect(basicMockResponse.status).toHaveBeenCalledWith(200);

    });

    it("should get a surfer by their id", async () => {

        await createSurfer(mockRequestBody, basicMockResponse);

        const mockRequest = {
            params: {
                surferId: '64b74f23e0ae231cf10c340c'
            }
        };

        await getSurfer(mockRequest, basicMockResponse);

        expect(basicMockResponse.json).toHaveBeenCalled();
        expect(basicMockResponse.status).toHaveBeenCalledWith(200);
        expect(basicMockResponse.json.mock.lastCall[0].userName).toBe('surferName');

    });

    it("should say there is no surfer with this id", async () => {
        const mockRequest = {
            params: {
                surferId: '64b74f23e0ae231cf10c340c' // must be an objectId string
            }
        };

        await getSurfer(mockRequest, basicMockResponse);

        expect(basicMockResponse.json).toHaveBeenCalled();
        expect(basicMockResponse.status).toHaveBeenCalledWith(404);
        expect(basicMockResponse.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "No surfer with this id exists!"
            })
        );
    });

    it("should throw an error", async () => {

        

    })
});
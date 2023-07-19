const { loginSurfer, checkSession } = require('./loginController');
const { connect, clearDatabase, closeDatabase } = require('../utils/db_test_setup');
const Bcrypt = require('bcryptjs');
const db = require('../models');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

const compareSyncSpy = jest.spyOn(Bcrypt, 'compareSync')
// const basicSurfer = {
//     userName: 'surfer123',
//     userPassword: 'testing123'
// }

describe("Testing the login controller routes", () => {

    const password = 'testing123';
    const hashedPassword = Bcrypt.hashSync(password, 10);
    const fakeSurfer = {
        userName: 'surferName',
        userPassword: hashedPassword
        
    };

    db.Surfer.findOne = jest.fn().mockImplementation((query) => {
        return query.userName === fakeSurfer.userName ? Promise.resolve(fakeSurfer) : Promise.resolve(null);
    })
    it("login should fail with a 400 status", async () => {
        const mockRequestBody = {
            body: {
                userName: 'surferName',
            }
        };
        const basicMockResponse = {
            json: jest.fn(),
            status: jest.fn(() => basicMockResponse),
            send: jest.fn(() => basicMockResponse)
        };


        await loginSurfer(mockRequestBody, basicMockResponse);

        expect(basicMockResponse.status).toHaveBeenCalledWith(400)
        expect(basicMockResponse.send).toHaveBeenCalledWith({
            message: 'The surfer does not exist!'
        })


    })

    it("should return 400 if password is invalid", async () => {

        compareSyncSpy.mockReturnValue(false);
        const mockRequest = {
            body: {
                username: 'surferName',
                password: 'wrongPassword'
            }
        };
        const mockResponse = {
            json: jest.fn(),
            status: jest.fn(() => mockResponse),
            send: jest.fn(() => mockResponse)
        };

        await loginSurfer(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith({ message: "The password is invalid" });

    })

    it("should return 200 and he user data if the login is successful", async () => {
        compareSyncSpy.mockReturnValue(true);

        const mockRequest = {
            body: {
                username: 'surferName',
                password: 'testing123'
            },
            session: {} // pass empty session object
        };

        const mockResponse = {
            json: jest.fn(),
            status: jest.fn(() => mockResponse),
            // send: jest.fn(() => mockResponse)
        };

        await loginSurfer(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200)
    })

})
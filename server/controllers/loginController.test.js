const { loginSurfer, checkSession } = require('./loginController');
const { connect, clearDatabase, closeDatabase } = require('../utils/db_test_setup');
const bcrypt = require('bcryptjs');
const db = require('../models');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

const basicMockResponse = {
    json: jest.fn(),
    status: jest.fn(() => basicMockResponse),
    send: jest.fn(() => basicMockResponse)
};

const compareSyncSpy = jest.spyOn(bcrypt, 'compareSync');

describe("Testing the login controller routes", () => {
    // set up fake user for testing
    const password = 'testing123';
    const hashedPassword = bcrypt.hashSync(password, 10);
    const fakeSurfer = {
        userName: 'surferName',
        userPassword: hashedPassword
    };

    db.Surfer.findOne = jest.fn().mockImplementation((query) => {
        return query.userName === fakeSurfer.userName ? Promise.resolve(fakeSurfer) : Promise.resolve(null);
    });

    it("login should fail with a 400 status", async () => {
        const mockRequestBody = {
            body: {
                userName: 'surferName',
            }
        };
        await loginSurfer(mockRequestBody, basicMockResponse);

        expect(basicMockResponse.status).toHaveBeenCalledWith(400)
        expect(basicMockResponse.send).toHaveBeenCalledWith({
            message: 'The surfer does not exist!'
        });
    });

    it("should return 400 if password is invalid", async () => {
        // tell test password hashes do not match
        compareSyncSpy.mockReturnValue(false);
        const mockRequest = {
            body: {
                username: 'surferName',
                password: 'wrongPassword'
            }
        };

        await loginSurfer(mockRequest, basicMockResponse);
        expect(basicMockResponse.status).toHaveBeenCalledWith(400);
        expect(basicMockResponse.send).toHaveBeenCalledWith({ message: "The password is invalid" });

    })

    it("should return 200 and he user data if the login is successful", async () => {
        // tell test that password hash values do match
        compareSyncSpy.mockReturnValue(true);

        const mockRequest = {
            body: {
                username: 'surferName',
                password: 'testing123'
            },
            session: {} // pass empty session object
        };

        await loginSurfer(mockRequest, basicMockResponse);
        expect(basicMockResponse.status).toHaveBeenCalledWith(200);
        expect(basicMockResponse.json).toHaveBeenCalledWith(expect.objectContaining({ 
            message: "You are now logged in!",
        }));
    });
});

describe("testing the checkSession", () => {
    it("should return status 200 if user is logged in", async () => {
        const mockRequest = {
            session: {
                logged_in: true
            }
        };

        await checkSession(mockRequest, basicMockResponse);
        expect(basicMockResponse.status).toHaveBeenCalledWith(200);
    });

    it("should return status 401 if the user is not logged in", async () => {
        const mockRequest = {
            session: {
                logged_in: false
            }
        };

        await checkSession(mockRequest, basicMockResponse);
        expect(basicMockResponse.status).toHaveBeenCalledWith(401);
    });
});
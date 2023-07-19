const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Surfer = require('./Surfer');

const { connect, clearDatabase, closeDatabase } = require('../utils/db_test_setup');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe("Surfer Model Test", () => {
    it("create and save a surfer successfully", async () => {
        const userData = {
            userName: 'surfer123',
            userPassword: 'testPassword123'
        };

        const validUser = new Surfer(userData);
        const savedUser = await validUser.save();

        // Object ID should be defined when saved to mongo
        expect(savedUser._id).toBeDefined();
        expect(savedUser.userName).toBe(userData.userName);

        // password should be hashed
        expect(savedUser.userPassword).not.toBe(userData.userPassword);
        expect(bcrypt.compareSync(userData.userPassword, savedUser.userPassword)).toBeTruthy();
    });

    it("should fail if userName does not exist", async () => {
        const userData = {
            userPassword: 'userPassword123',
        };

        const invalidUser = new Surfer(userData);

        let error;
        try {
            const savedUser = await invalidUser.save()
        } catch(e){
            error = e;
        }
        expect(error).toBeDefined();
        expect(error.message).toContain("userName")
    });

    
    it("should fail if userPassword does not exist", async () => {
        const userData = {
            userName: 'surfer123',
        };

        const invalidUser = new Surfer(userData);

        let error;
        try {
            const savedUser = await invalidUser.save()
        } catch(err){
            error = err;
        }
        expect(error).toBeDefined();
        expect(error.message).toContain("userPassword")
    });

    it("should fail if userName does not meet minimum length", async() => {
        const userData = {
            userName: 'surf', 
            userPassword: 'userPassword123'
        };

        const invalidUserNameLength = new Surfer(userData);
        let error;
        try{
            const savedUser = await invalidUserNameLength.save()
        } catch(err){
            console.log(err)
            error = err;
            // console.log(error);
        }
        expect(error).toBeDefined();
        
    })


})
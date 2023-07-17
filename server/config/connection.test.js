const db = require('./connection');
describe("Database Connection", () => {
    
    afterAll(() => {
        db.close()
    })
    test("should be connecting to the database", async () => {
        const readyState = db.readyState;
        expect(readyState).toBe(2);
    });
    test("should be connected to the database", done => {
        db.once('open', () => {

            const readyState = db.readyState;
            expect(readyState).toBe(1);
            done();
        })
    });


})
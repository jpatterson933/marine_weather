const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod = null;

module.exports = {
    async connect() {
        // console.log("connecting to database")
        if (!mongod) {
            mongod = await MongoMemoryServer.create();
        }
        const uri = mongod.getUri();
        const mongooseOpts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        await mongoose.connect(uri, mongooseOpts);
    },
    async closeDatabase() {
        // console.log("closing database")
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongod.stop();
    },
    async clearDatabase() {
        // console.log("clearing database")
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    }
};
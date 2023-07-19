const { loginSurfer, checkSession } = require('./loginController');
const { connect, clearDatabase, closeDatabase } = require('../utils/db_test_setup');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

